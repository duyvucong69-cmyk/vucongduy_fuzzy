import { useState, useEffect } from 'react';
import Index from './pages/Index.jsx';
import Index2 from './pages/Index2.jsx';
import Login from './pages/Login.jsx';
import AdminOrders from './pages/AdminOrders.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Landing from './pages/Landing.jsx';
import Cart from './pages/Cart.jsx';
import Categories from './pages/Categories.jsx';
import Checkout from './pages/Checkout.jsx';
import Coupon from './pages/Coupon.jsx';
import EmptyCart from './pages/EmptyCart.jsx';
import EmptyNotification from './pages/EmptyNotification.jsx';
import EmptyOrderHistory from './pages/EmptyOrderHistory.jsx';
import EmptySearch from './pages/EmptySearch.jsx';
import EmptyWishlist from './pages/EmptyWishlist.jsx';
import Help from './pages/Help.jsx';
import Language from './pages/Language.jsx';
import ManageAddress from './pages/ManageAddress.jsx';
import ManageDeliveryAddress from './pages/ManageDeliveryAddress.jsx';
import ManagePayment from './pages/ManagePayment.jsx';
import Ne from './pages/Ne.jsx';
import NewAddress from './pages/NewAddress.jsx';
import NewCard from './pages/NewCard.jsx';
import Notification from './pages/Notification.jsx';
import OrderDetails from './pages/OrderDetails.jsx';
import OrderHistory from './pages/OrderHistory.jsx';
import OrderTracking from './pages/OrderTracking.jsx';
import OtherSetting from './pages/OtherSetting.jsx';
import Otp from './pages/Otp.jsx';
import PageListing from './pages/PageListing.jsx';
import Payment from './pages/Payment.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Product2Details from './pages/Product2Details.jsx';
import Profile from './pages/Profile.jsx';
import ProfileSetting from './pages/ProfileSetting.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Search from './pages/Search.jsx';
import Setting from './pages/Setting.jsx';
import Shipping from './pages/Shipping.jsx';
import ShippingAddress from './pages/ShippingAddress.jsx';
import Shop from './pages/Shop.jsx';
import TermsConditions from './pages/TermsConditions.jsx';
import Voucher from './pages/Voucher.jsx';
import Wishlist from './pages/Wishlist.jsx';

function App() {
  // Use hash-based routing to support relative paths in all environments
  const [hash, setHash] = useState(window.location.hash || '#/');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    });
  };

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // React effect to trigger dynamic JS enhancements on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      // 1. Initialize Iconsax icons
      const iconsaxElements = document.querySelectorAll(".iconsax");
      iconsaxElements.forEach((iconsax) => {
        const iconName = iconsax.getAttribute("data-icon")?.toLowerCase().trim();
        if (iconName) {
          fetch(`https://glenthemes.github.io/iconsax/icons/${iconName}.svg`)
            .then((res) => {
              if (res.ok) return res.text();
              throw new Error('Failed to load icon');
            })
            .then((svgText) => {
              iconsax.innerHTML = svgText;
              if (iconsax.querySelectorAll("[http-equiv='Content-Security-Policy']").length) {
                iconsax.innerHTML = "";
              }
            })
            .catch((err) => console.warn(`Iconsax error for ${iconName}:`, err));
        }
      });

      // 2. Set background images (.bg-img)
      const bgImg = document.querySelectorAll(".bg-img");
      bgImg.forEach((bgImgEl: any) => {
        if (!bgImgEl.parentNode) return;
        
        if (bgImgEl.classList.contains("bg-top")) {
          bgImgEl.parentNode.classList.add("b-top");
        } else if (bgImgEl.classList.contains("bg-bottom")) {
          bgImgEl.parentNode.classList.add("b-bottom");
        } else if (bgImgEl.classList.contains("bg-center")) {
          bgImgEl.parentNode.classList.add("b-center");
        } else if (bgImgEl.classList.contains("bg-left")) {
          bgImgEl.parentNode.classList.add("b-left");
        } else if (bgImgEl.classList.contains("bg-right")) {
          bgImgEl.parentNode.classList.add("b-right");
        }

        if (bgImgEl.classList.contains("blur-up")) {
          bgImgEl.parentNode.classList.add("blur-up", "lazyload");
        }

        if (bgImgEl.classList.contains("bg_size_content")) {
          bgImgEl.parentNode.classList.add("b_size_content");
        }

        bgImgEl.parentNode.classList.add("bg-size");
        const bgSrc = bgImgEl.src;
        bgImgEl.style.display = "none";
        bgImgEl.parentNode.setAttribute(
          "style",
          `background-image: url(${bgSrc}); background-size: cover; background-position: center; background-repeat: no-repeat; display: block;`
        );
      });

      // 3. Initialize Swiper instances
      const SwiperClass = (window as any).Swiper;
      if (SwiperClass) {
        // Slider 1 (Onboarding)
        if (document.querySelector(".slider-1")) {
          new SwiperClass(".slider-1", {
            slidesPerView: 1,
            loop: true,
            autoplay: {
              delay: 2000,
              disableOnInteraction: false,
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          });
        }
        
        // Categories
        if (document.querySelector(".categories")) {
          new SwiperClass(".categories", {
            slidesPerView: 4,
            spaceBetween: 10,
            loop: true,
            breakpoints: {
              0: { slidesPerView: 3 },
              375: { slidesPerView: 4 },
              767: { slidesPerView: 5 },
            },
          });
        }

        // Offer
        if (document.querySelector(".offer")) {
          new SwiperClass(".offer", {
            slidesPerView: 1.5,
            spaceBetween: 20,
            loop: true,
            breakpoints: {
              0: { slidesPerView: 1 },
              375: { slidesPerView: 1.2 },
              425: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
            },
          });
        }

        // Similer Product
        if (document.querySelector(".similer-product")) {
          new SwiperClass(".similer-product", {
            slidesPerView: 2,
            spaceBetween: 15,
            loop: true,
          });
        }

        // Product 1
        if (document.querySelector(".product-1")) {
          new SwiperClass(".product-1", {
            slidesPerView: 1.6,
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              type: "progressbar",
            },
          });
        }

        // Product 2
        if (document.querySelector(".product-2")) {
          new SwiperClass(".product-2", {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        }
      }

      // 4. Like / Wishlist toggles
      const likeButtons = document.querySelectorAll(".like-btn");
      likeButtons.forEach((el) => {
        // Remove existing listener to avoid multiple binds
        const clone = el.cloneNode(true);
        el.parentNode?.replaceChild(clone, el);
        clone.addEventListener("click", (event: any) => {
          if (event.target.parentNode) {
            event.target.parentNode.classList.toggle("animate");
            event.target.parentNode.classList.toggle("active");
            event.target.parentNode.classList.toggle("inactive");
          }
        });
      });

      // 5. Plus Minus Quantity Items
      const plusMinusBoxes = document.querySelectorAll(".plus-minus");
      plusMinusBoxes.forEach((box) => {
        const addButton = box.querySelector(".add");
        const subButton = box.querySelector(".sub");
        const inputEl = box.querySelector("input[type='number']") as HTMLInputElement;

        addButton?.addEventListener("click", () => {
          if (inputEl && Number(inputEl.value) < 10) {
            inputEl.value = String(Number(inputEl.value) + 1);
          }
        });

        subButton?.addEventListener("click", () => {
          if (inputEl && Number(inputEl.value) >= 1) {
            inputEl.value = String(Number(inputEl.value) - 1);
          }
        });
      });

      // 6. Delete Quantity Item
      const cartBoxes = document.querySelectorAll(".cart-product-box");
      cartBoxes.forEach((box: any) => {
        const deleteButton = box.querySelector(".trash");
        deleteButton?.addEventListener("click", () => {
          box.style.display = "none";
        });
      });

      // 7. Dark Switch Toggle
      const darkSwitch = document.querySelector("#dark-switch") as HTMLInputElement;
      const bodyDom = document.querySelector("body");
      if (darkSwitch && bodyDom) {
        darkSwitch.checked = localStorage.getItem("layout_version") === "dark";
        darkSwitch.addEventListener("change", (e: any) => {
          if (e.target.checked) {
            bodyDom.classList.add("dark");
            localStorage.setItem("layout_version", "dark");
          } else {
            bodyDom.classList.remove("dark");
            localStorage.removeItem("layout_version");
          }
        });
      }

      // 8. Set dynamic body classes based on route
      const cleanRoute = route.replace(/^\//, '');
      const authRoutes = ['login', 'create-account', 'forgot-password', 'reset-password', 'otp'];
      const onboardingRoutes = ['', 'index', 'index-2', 'index2'];

      let bodyClass = '';
      if (onboardingRoutes.includes(cleanRoute)) {
        bodyClass = 'auth-body dark';
      } else if (authRoutes.includes(cleanRoute)) {
        bodyClass = 'auth-body';
        if (localStorage.getItem("layout_version") === "dark") {
          bodyClass += ' dark';
        }
      } else {
        bodyClass = '';
        if (localStorage.getItem("layout_version") === "dark") {
          bodyClass = 'dark';
        }
      }
      document.body.className = bodyClass;

    }, 100);

    return () => clearTimeout(timer);
  }, [hash]);

  // Extract path and query parameters
  const hashPath = hash.replace(/^#/, '') || '/';
  const pathPart = hashPath.split('?')[0];
  const queryPart = hashPath.split('?')[1] || '';
  const queryParams = new URLSearchParams(queryPart);
  const route = pathPart.toLowerCase() || '/';

  let pageToRender;

  // Map path to component
  switch (route) {
    case '':
    case '/':
    case '/index':
      pageToRender = <Index />;
      break;
    case '/index-2':
    case '/index2':
      pageToRender = <Index2 />;
      break;
    case '/login':
      pageToRender = <Login />;
      break;
    case '/admin-orders':
      pageToRender = <AdminOrders />;
      break;
    case '/create-account':
      pageToRender = <CreateAccount />;
      break;
    case '/forgot-password':
      pageToRender = <ForgotPassword />;
      break;
    case '/landing':
      pageToRender = <Landing />;
      break;
    case '/cart':
      pageToRender = <Cart />;
      break;
    case '/categories':
      pageToRender = <Categories />;
      break;
    case '/checkout':
      pageToRender = <Checkout />;
      break;
    case '/coupon':
      pageToRender = <Coupon />;
      break;
    case '/empty-cart':
      pageToRender = <EmptyCart />;
      break;
    case '/empty-notification':
      pageToRender = <EmptyNotification />;
      break;
    case '/empty-order-history':
      pageToRender = <EmptyOrderHistory />;
      break;
    case '/empty-search':
      pageToRender = <EmptySearch />;
      break;
    case '/empty-wishlist':
      pageToRender = <EmptyWishlist />;
      break;
    case '/help':
      pageToRender = <Help />;
      break;
    case '/language':
      pageToRender = <Language />;
      break;
    case '/manage-address':
      pageToRender = <ManageAddress />;
      break;
    case '/manage-delivery-address':
      pageToRender = <ManageDeliveryAddress />;
      break;
    case '/manage-payment':
      pageToRender = <ManagePayment />;
      break;
    case '/ne':
      pageToRender = <Ne />;
      break;
    case '/new-address':
      pageToRender = <NewAddress />;
      break;
    case '/new-card':
      pageToRender = <NewCard />;
      break;
    case '/notification':
      pageToRender = <Notification />;
      break;
    case '/order-details':
      pageToRender = <OrderDetails />;
      break;
    case '/order-history':
      pageToRender = <OrderHistory />;
      break;
    case '/order-tracking':
      pageToRender = <OrderTracking queryParams={queryParams} />;
      break;
    case '/other-setting':
      pageToRender = <OtherSetting />;
      break;
    case '/otp':
      pageToRender = <Otp />;
      break;
    case '/page-listing':
      pageToRender = <PageListing />;
      break;
    case '/payment':
      pageToRender = <Payment />;
      break;
    case '/product-details':
      pageToRender = <ProductDetails queryParams={queryParams} />;
      break;
    case '/product2-details':
      pageToRender = <Product2Details />;
      break;
    case '/profile':
      pageToRender = <Profile />;
      break;
    case '/profile-setting':
      pageToRender = <ProfileSetting />;
      break;
    case '/reset-password':
      pageToRender = <ResetPassword />;
      break;
    case '/search':
      pageToRender = <Search />;
      break;
    case '/setting':
      pageToRender = <Setting />;
      break;
    case '/shipping':
      pageToRender = <Shipping />;
      break;
    case '/shipping-address':
      pageToRender = <ShippingAddress />;
      break;
    case '/shop':
      pageToRender = <Shop queryParams={queryParams} />;
      break;
    case '/terms-conditions':
      pageToRender = <TermsConditions />;
      break;
    case '/voucher':
      pageToRender = <Voucher />;
      break;
    case '/wishlist':
      pageToRender = <Wishlist />;
      break;
    default:
      pageToRender = (
        <div style={{ padding: '20px', color: '#fff', textAlign: 'center' }}>
          <h2>404 Page Not Found</h2>
          <p>Requested hash path: {route}</p>
          <a href="#/" style={{ color: '#ffb300', textDecoration: 'underline' }}>Go to Home</a>
        </div>
      );
  }

  return (
    <>
      {!isOnline && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#d9534f',
          color: '#fff',
          textAlign: 'center',
          padding: '8px 10px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          zIndex: 99999,
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          ⚠️ Không có kết nối mạng. Bạn đang duyệt ở chế độ ngoại tuyến.
        </div>
      )}
      
      {pageToRender}

      {showInstallBanner && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          left: '20px',
          right: '20px',
          backgroundColor: '#122636',
          border: '1px solid #ffb300',
          borderRadius: '10px',
          padding: '15px',
          zIndex: 9999,
          color: '#fff',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0 }}>Cài đặt ứng dụng Fuzzy</h4>
            <button onClick={() => setShowInstallBanner(false)} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '1.3rem', cursor: 'pointer' }}>×</button>
          </div>
          <p style={{ fontSize: '1.1rem', margin: 0, color: '#ccc' }}>
            Thêm Fuzzy vào màn hình chính để mua sắm nhanh chóng và mượt mà hơn.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button onClick={() => setShowInstallBanner(false)} style={{ background: '#333', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '4px', fontSize: '1.1rem', cursor: 'pointer' }}>Bỏ qua</button>
            <button onClick={handleInstallClick} style={{ background: '#ffb300', border: 'none', color: '#122636', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>Cài đặt</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
