import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../utils/auth';

const Shop = ({ queryParams }) => {
  const initialCategory = queryParams?.get('categoryId') || '';
  const initialSearch = queryParams?.get('search') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Filtering & Sorting State
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchVal, setSearchVal] = useState(initialSearch);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSort, setSelectedSort] = useState('newest');

  // Bottom Sheet Visibility
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Pagination & Loading State
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 6;

  // Fetch Categories on mount
  useEffect(() => {
    apiFetch('/api/categories')
      .then(data => setCategories(data))
      .catch(err => console.warn('Failed to load categories:', err));
  }, []);

  // Fetch Products
  const fetchProducts = useCallback(async (currentOffset, append = false) => {
    try {
      setLoading(true);
      
      // Build query string
      let query = `/api/products?limit=${limit}&offset=${currentOffset}`;
      if (selectedCategory) query += `&categoryId=${selectedCategory}`;
      if (searchVal) query += `&search=${encodeURIComponent(searchVal)}`;
      if (minPrice) query += `&minPrice=${minPrice}`;
      if (maxPrice) query += `&maxPrice=${maxPrice}`;
      if (selectedColor) query += `&color=${encodeURIComponent(selectedColor)}`;
      if (selectedSize) query += `&size=${encodeURIComponent(selectedSize)}`;
      if (selectedSort) query += `&sort=${selectedSort}`;

      const data = await apiFetch(query);
      
      if (append) {
        setProducts(prev => [...prev, ...data.products]);
      } else {
        setProducts(data.products);
      }
      
      setHasMore(data.pagination.hasMore);
      setOffset(currentOffset + limit);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchVal, minPrice, maxPrice, selectedColor, selectedSize, selectedSort]);

  // Trigger fetch when filter changes
  useEffect(() => {
    setOffset(0);
    fetchProducts(0, false);
  }, [selectedCategory, searchVal, selectedColor, selectedSize, selectedSort, fetchProducts]);

  // Infinite Scroll scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;

      // Check if user scrolled near the bottom (100px before end)
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchProducts(offset, true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, offset, fetchProducts]);

  const handleApplyFilter = (e) => {
    e.preventDefault();
    setIsFilterOpen(false);
    setOffset(0);
    fetchProducts(0, false);
  };

  const handleResetFilter = () => {
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedColor('');
    setSelectedSize('');
    setSelectedSort('newest');
    setIsFilterOpen(false);
    setOffset(0);
    fetchProducts(0, false);
  };

  const colorOptions = [
    { name: 'Navy Blue', hex: '#122636' },
    { name: 'Yellow', hex: '#ffb300' },
    { name: 'Red', hex: '#d9534f' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Black', hex: '#000000' },
    { name: 'Grey', hex: '#808080' },
    { name: 'Brown', hex: '#5c4033' },
  ];

  const sizeOptions = ['S', 'M', 'L', 'Standard', 'Queen', 'King', '3-Seater'];

  // Find active category name for title
  const activeCategory = categories.find(c => c.id === selectedCategory);
  const headerTitle = activeCategory ? activeCategory.name : 'Shop Products';

  return (
    <>
      {/* Header */}
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <a href="#/landing">
              <i className="iconsax back-btn" data-icon="arrow-left"></i>
            </a>
            <h3>{headerTitle}</h3>
            <a href="#/notification" className="notification">
              <i className="iconsax notification-icon" data-icon="bell-2"></i>
            </a>
          </div>
        </div>
      </header>

      {/* Search Input and Filter Trigger */}
      <section>
        <div className="custom-container">
          <div className="search-head" style={{ display: 'flex', gap: '10px' }}>
            <div className="form-input" style={{ flexGrow: 1, position: 'relative' }}>
              <input
                type="text"
                className="form-control search"
                placeholder="Search products..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                style={{ width: '100%', paddingLeft: '40px', height: '45px', borderRadius: '8px', border: '1px solid #ddd', background: 'transparent', color: '#fff' }}
              />
              <i className="iconsax search-icon" data-icon="search-normal-2" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }}></i>
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '8px',
                background: '#122636',
                border: '1px solid #ffb300',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <i className="iconsax" data-icon="media-sliders-3" style={{ fontSize: '1.8rem', color: '#ffb300' }}></i>
            </button>
          </div>
        </div>
      </section>

      {/* Product List Grid */}
      <section className="section-b-space">
        <div className="custom-container">
          {products.length === 0 && !loading && (
            <div style={{ textAlign: 'center', margin: '50px 0' }}>
              <h4 style={{ color: '#999' }}>No products found</h4>
              <button onClick={handleResetFilter} className="btn btn-sm mt-3" style={{ background: '#122636', color: '#ffb300', border: '1px solid #ffb300' }}>
                Clear Filters
              </button>
            </div>
          )}

          <div className="row g-3">
            {products.map((prod) => (
              <div key={prod.id} className="col-6">
                <div className="product-box" style={{ background: '#122636', padding: '10px', borderRadius: '12px' }}>
                  <div className="product-box-img" style={{ position: 'relative' }}>
                    <a href={`#/product-details?id=${prod.id}`}>
                      <img className="img" src={prod.images[0]} alt={prod.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px' }} />
                    </a>
                    <div className="cart-box" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                      <a href={`#/product-details?id=${prod.id}`} className="cart-bag">
                        <i className="iconsax bag" data-icon="basket-2"></i>
                      </a>
                    </div>
                  </div>
                  <div className="product-box-detail" style={{ marginTop: '10px' }}>
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: '0 0 5px', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <a href={`#/product-details?id=${prod.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{prod.name}</a>
                    </h4>
                    <div className="bottom-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="price">
                        <h4 style={{ color: '#ffb300', fontSize: '1.3rem', margin: 0 }}>${prod.price}</h4>
                      </div>
                      <div className="rating" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <img src="images/svg/Star.svg" alt="star" style={{ width: '12px', height: '12px' }} />
                        <h6 style={{ margin: 0, fontSize: '1.1rem', color: '#ccc' }}>{prod.rating}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {loading && (
            <p style={{ textAlign: 'center', marginTop: '20px', color: '#999', fontSize: '1.3rem' }}>
              Loading products...
            </p>
          )}
        </div>
      </section>

      {/* Bottom Sheet Filter */}
      {isFilterOpen && (
        <div
          onClick={() => setIsFilterOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 9998
          }}
        />
      )}

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          backgroundColor: '#122636',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
          padding: '20px',
          zIndex: 9999,
          boxSizing: 'border-box',
          transform: isFilterOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Pull handle */}
        <div style={{ width: '40px', height: '5px', borderRadius: '5px', backgroundColor: '#444', margin: '0 auto 20px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff', margin: 0 }}>Filter & Sort</h3>
          <button onClick={handleResetFilter} style={{ background: 'none', border: 'none', color: '#ffb300', fontSize: '1.3rem', cursor: 'pointer' }}>
            Reset All
          </button>
        </div>

        <form onSubmit={handleApplyFilter}>
          {/* Sort By */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '10px' }}>Sort By</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {[
                { value: 'newest', label: 'New Arrivals' },
                { value: 'price_asc', label: 'Price: Low to High' },
                { value: 'price_desc', label: 'Price: High to Low' },
                { value: 'rating', label: 'Top Rated' }
              ].map(opt => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setSelectedSort(opt.value)}
                  style={{
                    padding: '8px 15px',
                    borderRadius: '20px',
                    border: '1px solid #ffb300',
                    background: selectedSort === opt.value ? '#ffb300' : 'transparent',
                    color: selectedSort === opt.value ? '#122636' : '#fff',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '10px' }}>Category</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setSelectedCategory('')}
                style={{
                  padding: '8px 15px',
                  borderRadius: '20px',
                  border: '1px solid #ffb300',
                  background: selectedCategory === '' ? '#ffb300' : 'transparent',
                  color: selectedCategory === '' ? '#122636' : '#fff',
                  fontSize: '1.2rem',
                  cursor: 'pointer'
                }}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '8px 15px',
                    borderRadius: '20px',
                    border: '1px solid #ffb300',
                    background: selectedCategory === cat.id ? '#ffb300' : 'transparent',
                    color: selectedCategory === cat.id ? '#122636' : '#fff',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '10px' }}>Price Range</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={{ flex: 1, height: '40px', borderRadius: '5px', border: '1px solid #444', padding: '10px', background: 'transparent', color: '#fff' }}
              />
              <span style={{ color: '#fff' }}>to</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{ flex: 1, height: '40px', borderRadius: '5px', border: '1px solid #444', padding: '10px', background: 'transparent', color: '#fff' }}
              />
            </div>
          </div>

          {/* Colors */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '10px' }}>Color</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              {colorOptions.map(c => (
                <div
                  key={c.hex}
                  onClick={() => setSelectedColor(selectedColor === c.hex ? '' : c.hex)}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: c.hex,
                    border: selectedColor === c.hex ? '3px solid #ffb300' : '1px solid #444',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '10px' }}>Size</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {sizeOptions.map(size => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                  style={{
                    padding: '8px 15px',
                    borderRadius: '5px',
                    border: '1px solid #444',
                    background: selectedSize === size ? '#ffb300' : 'transparent',
                    color: selectedSize === size ? '#122636' : '#fff',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              type="button"
              onClick={() => setIsFilterOpen(false)}
              className="btn w-50"
              style={{ background: '#333', color: '#fff', padding: '12px', borderRadius: '5px', border: 'none', fontSize: '1.4rem' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="theme-btn btn w-50"
              style={{ background: '#ffb300', color: '#122636', padding: '12px', borderRadius: '5px', border: 'none', fontWeight: 'bold', fontSize: '1.4rem' }}
            >
              Apply Filter
            </button>
          </div>
        </form>
      </div>

      {/* Navbar Menu */}
      <div className="navbar-menu">
        <ul>
          <li>
            <a href="#/landing">
              <div className="icon">
                <img className="unactive" src="images/svg/home.svg" alt="home" />
                <img className="active" src="images/svg/home-fill.svg" alt="home" />
              </div>
            </a>
          </li>
          <li className="active">
            <a href="#/categories">
              <div className="icon">
                <img className="unactive" src="images/svg/categories.svg" alt="categories" />
                <img className="active" src="images/svg/categories-fill.svg" alt="categories" />
              </div>
            </a>
          </li>
          <li>
            <a href="#/cart">
              <div className="icon">
                <img className="unactive" src="images/svg/bag.svg" alt="bag" />
                <img className="active" src="images/svg/bag-fill.svg" alt="bag" />
              </div>
            </a>
          </li>
          <li>
            <a href="#/wishlist">
              <div className="icon">
                <img className="unactive" src="images/svg/heart.svg" alt="heart" />
                <img className="active" src="images/svg/heart-fill.svg" alt="heart" />
              </div>
            </a>
          </li>
          <li>
            <a href="#/profile">
              <div className="icon">
                <img className="unactive" src="images/svg/profile.svg" alt="profile" />
                <img className="active" src="images/svg/profile-fill.svg" alt="profile" />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Shop;
