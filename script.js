// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle")
const navMenu = document.querySelector(".nav-menu")

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")

    // Animate hamburger icon
    const spans = menuToggle.querySelectorAll("span")
    if (navMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translateY(10px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translateY(-10px)"
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-menu a")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navMenu.classList.remove("active")
      const spans = menuToggle.querySelectorAll("span")
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })
})

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault()
      const target = document.querySelector(href)
      const offsetTop = target.offsetTop - 80

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated")
    }
  })
}, observerOptions)

// Add animation class to cards
const cards = document.querySelectorAll(".service-card, .product-card, .plugin-card, .hosting-card")
cards.forEach((card) => {
  card.classList.add("animate-on-scroll")
  observer.observe(card)
})

// Animate feature bars on scroll
const featureBars = document.querySelectorAll(".hosting-card")
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll(".feature-fill")
      fills.forEach((fill, index) => {
        setTimeout(() => {
          fill.style.width = fill.style.width
        }, index * 200)
      })
    }
  })
}, observerOptions)

featureBars.forEach((card) => {
  barObserver.observe(card)
})

// Parallax effect for floating cards
let lastScrollY = window.scrollY

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY
  const delta = scrollY - lastScrollY

  const floatingCards = document.querySelectorAll(".floating-card")
  floatingCards.forEach((card, index) => {
    const speed = (index + 1) * 0.1
    const currentTransform = card.style.transform || "translateY(0)"
    const currentY = Number.parseFloat(
      currentTransform.match(/translateY$$([^)]+)$$/) ? currentTransform.match(/translateY$$([^)]+)$$/)[1] : 0,
    )
    card.style.transform = `translateY(${currentY + delta * speed}px)`
  })

  lastScrollY = scrollY
})

// Add active state to navigation
const sections = document.querySelectorAll("section[id]")

function highlightNavigation() {
  const scrollY = window.scrollY

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

window.addEventListener("scroll", highlightNavigation)

// Form submission handler
const footerForm = document.querySelector(".footer-form")
if (footerForm) {
  footerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = footerForm.querySelector("input").value

    // Simulate form submission
    alert(`Thank you for subscribing! We'll send SEO tips to ${email}`)
    footerForm.reset()
  })
}

// Add hover effect to cards
const allCards = document.querySelectorAll(".service-card, .product-card, .plugin-card, .hosting-card")
allCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.zIndex = "10"
  })

  card.addEventListener("mouseleave", function () {
    this.style.zIndex = "1"
  })
})

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = formatStatNumber(target)
      clearInterval(timer)
    } else {
      element.textContent = formatStatNumber(Math.floor(start))
    }
  }, 16)
}

function formatStatNumber(num) {
  if (num >= 500) return "500+"
  if (num >= 95) return "95%"
  if (num >= 3) return "3x"
  return num
}

// Trigger counter animation when hero is visible
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = document.querySelectorAll(".stat-number")
        animateCounter(statNumbers[0], 500)
        animateCounter(statNumbers[1], 95)
        animateCounter(statNumbers[2], 3)
        heroObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const heroSection = document.querySelector(".hero")
if (heroSection) {
  heroObserver.observe(heroSection)
}

// Add random rotation to cards on load for brutalist effect
document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card")
  productCards.forEach((card) => {
    const randomRotation = (Math.random() - 0.5) * 2 // -1 to 1 degree
    card.style.setProperty("--random-rotation", `${randomRotation}deg`)
  })
})

console.log("🚀 SEO Services US - Website Loaded Successfully!")
