const scroller = document.querySelector("#wrapwrap");


if (window.location.pathname === 'nl' || window.location.pathname === 'en' || window.location.pathname === 'de' || window.location.pathname.startsWith('/shop/category') || window.location.pathname.startsWith('/nl/shop/category') || location.pathname.startsWith('/en/shop/category') || location.pathname.startsWith('/de/shop/category') || location.pathname.startsWith('/tr/shop/category')){
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition) {
      scroller.scrollTo({
        top: scrollPosition,
        behavior: "smooth"
      });
    }
}

if (window.location.pathname === 'nl' || window.location.pathname === 'en' || window.location.pathname === 'de' || window.location.pathname.startsWith('/shop/category') || window.location.pathname.startsWith('/nl/shop/category') || location.pathname.startsWith('/en/shop/category') || location.pathname.startsWith('/de/shop/category') || location.pathname.startsWith('/tr/shop/category')){
    scroller.addEventListener("scroll", () => {
    localStorage.setItem("scrollPosition", scroller.scrollTop);
    });
}