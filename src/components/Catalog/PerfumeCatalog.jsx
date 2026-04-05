import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useCart } from '../../context/CartContext';
import PerfumeCard from './PerfumeCard';
import './Catalog.css';

export default function PerfumeCatalog() {
  const [perfumes, setPerfumes] = useState([]);
  const [filteredPerfumes, setFilteredPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [brands, setBrands] = useState([]);
  const [fragranceTypes, setFragranceTypes] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchPerfumes();
  }, []);

  useEffect(() => {
    filterPerfumes();
  }, [perfumes, selectedBrand, selectedType, searchQuery]);

  const fetchPerfumes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('perfumes')
        .select('*')
        .eq('in_stock', true);

      if (error) throw error;

      setPerfumes(data || []);

      const uniqueBrands = [...new Set(data?.map(p => p.brand) || [])];
      const uniqueTypes = [...new Set(data?.map(p => p.fragrance_type) || [])];

      setBrands(uniqueBrands.sort());
      setFragranceTypes(uniqueTypes.sort());
    } catch (error) {
      console.error('Error fetching perfumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPerfumes = () => {
    let filtered = perfumes;

    if (selectedBrand) {
      filtered = filtered.filter(p => p.brand === selectedBrand);
    }

    if (selectedType) {
      filtered = filtered.filter(p => p.fragrance_type === selectedType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      );
    }

    setFilteredPerfumes(filtered);
  };

  const handleAddToCart = (perfumeId) => {
    addToCart(perfumeId, 1);
  };

  if (loading) {
    return <div className="catalog-loading">Loading perfumes...</div>;
  }

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>Perfume Collection</h1>
        <p>Discover your signature scent</p>
      </div>

      <div className="catalog-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search perfumes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-row">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="filter-select"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            {fragranceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {(selectedBrand || selectedType || searchQuery) && (
            <button
              onClick={() => {
                setSelectedBrand('');
                setSelectedType('');
                setSearchQuery('');
              }}
              className="clear-filters-btn"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {filteredPerfumes.length === 0 ? (
        <div className="no-results">
          <p>No perfumes found matching your criteria.</p>
        </div>
      ) : (
        <div className="perfumes-grid">
          {filteredPerfumes.map(perfume => (
            <PerfumeCard
              key={perfume.id}
              perfume={perfume}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

      <div className="catalog-footer">
        <p>Showing {filteredPerfumes.length} of {perfumes.length} perfumes</p>
      </div>
    </div>
  );
}
