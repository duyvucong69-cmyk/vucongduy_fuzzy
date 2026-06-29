const EmptySearch = () => {
  return (
    <>
      <header className="section-t-space">
      <div className="custom-container">
        <div className="header-panel">
          <a href="#/landing">
            <i className="iconsax back-btn" data-icon="arrow-left"></i>
          </a>
          <h3>Search</h3>
        </div>
      </div>
    </header>
    

    
    <section>
      <div className="custom-container">
        <form className="theme-form search-head" target="_blank">
          <div className="form-group">
            <div className="form-input">
              <input type="text" className="form-control search" id="inputusername" placeholder="Search here..." />
              <i className="iconsax search-icon" data-icon="search-normal-2"></i>
            </div>
          </div>
        </form>
      </div>
    </section>
    

    
    <section className="section-b-space pt-0">
      <div className="custom-container">
        <div className="empty-tab">
          <img className="img-fluid empty-img w-100" src="images/gif/search.gif" alt="empty-search" />

          <h2>No Result to Show</h2>
          <h5 className="mt-3">Please check your spelling or try different key word.</h5>
        </div>
      </div>
    </section>
    </>
  );
};

export default EmptySearch;
