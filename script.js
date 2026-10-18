gsap.registerPlugin(ScrollTrigger);

// ================= LOADER =================
window.addEventListener("load", () => {
  document.body.style.background = "#f8f8f8";

  gsap.to("#loader", {
    opacity: 0,
    duration: 1,
    delay: 1
  });

  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 2000);
});

// ================= HERO =================
const heroTl = gsap.timeline();

heroTl
.from(".nav-box", {
  y: -50,
  opacity: 0,
  duration: 1
})
.from(".hero-left h1", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
}, "-=0.5")
.from("#typing", {
  y: 50,
  opacity: 0,
  duration: 1,
  onComplete: startTyping
}, "-=0.8")
.from(".hero-left p", {
  y: 30,
  opacity: 0,
  duration: 1
}, "-=0.8")
.from(".btn-group", {
  y: 30,
  opacity: 0,
  duration: 1
}, "-=0.7")
.from(".circle", {
  scale: 0.7,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
}, "-=1");

// ================= TYPING =================
function startTyping() {
  const el = document.getElementById("typing");

  const texts = ["Backend Developer", "Mahasiswa", "Creative Coder",];
  let i = 0;
  let j = 0;
  let deleting = false;

  function typing() {
    let text = texts[i];

    if (!deleting) {
      el.innerText = text.substring(0, j++);
    } else {
      el.innerText = text.substring(0, j--);
    }

    if (j > text.length) {
      deleting = true;
      setTimeout(typing, 700);
      return;
    }

    if (j === 0) {
      deleting = false;
      i = (i + 1) % texts.length;
    }

    setTimeout(typing, deleting ? 50 : 100);
  }

  typing();
}

// ================= PROJECT =================

// kiri
gsap.utils.toArray(".reveal-left").forEach(el => {
  gsap.to(el, {
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});

// kanan
gsap.utils.toArray(".reveal-right").forEach(el => {
  gsap.to(el, {
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});

// ================= HERO PARALLAX =================
gsap.to(".hero-left", {
  y: -50,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

gsap.to(".circle", {
  y: 80,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

// ================= ABOUT PARALLAX =================
gsap.to(".about-image", {
  y: -40,
  scrollTrigger: {
    trigger: ".about",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

// ================= TIMELINE LINE =================
gsap.fromTo(".timeline-line",
  { scaleY: 0 },
  {
    scaleY: 1,
    transformOrigin: "top",
    ease: "none",
    scrollTrigger: {
      trigger: ".timeline",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
      invalidateOnRefresh: false
    }
  }
);

// ================= SECTION FADE (SKIP ABOUT) =================
gsap.utils.toArray("section").forEach(section => {

  if (section.classList.contains("about")) return; // 🔥 skip about

  gsap.fromTo(section,
    { opacity: 1, y: 0, scale: 1 },
    {
      opacity: 0.2,
      y: -80,
      scale: 0.96,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    }
  );

});

// ================= ABOUT (SMOOTH VERSION) =================

// title (lebih smooth)
gsap.fromTo(".about-title",
  { y: 60, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 1.2, // #lebih lama 
    ease: "power2.out", // # lebih lembut
    scrollTrigger: {
      trigger: ".about-title",
      start: "top 75%",
      toggleActions: "play none none reverse"
    }
  }
);

// content (lebih santai + delay enak)
gsap.fromTo(".about-item",
  { y: 60, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 1.1,      // # lebih lama
    stagger: 0.4,       // # lebih santai
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".about-content",
      start: "top 70%",
      toggleActions: "play none none reverse"
    }
  }
);
gsap.fromTo(".bar span",
  { width: "0%" },
  {
    width: (i, el) => el.getAttribute("data-width"),
    duration: 1.5,
    ease: "power2.out",
    stagger: 0.2,

    scrollTrigger: {
      trigger: ".skills",
      start: "top 85%",
      toggleActions: "play reverse play reverse"
    }
  }
);

window.onload = () => {
  const tl = gsap.timeline();

  tl.to(".line", {
    width: "100%",
    duration: 1.5,
    ease: "power2.inOut"
  })
  .to("#loader", {
    y: "-100%",
    duration: 1,
    ease: "power4.inOut"
  });
};

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const indicator = document.querySelector(".nav-indicator");

function updateIndicator(el) {
  const rect = el.getBoundingClientRect();
  const parentRect = el.closest(".nav-box").getBoundingClientRect();

  indicator.style.width = rect.width + "px";
  indicator.style.left = (rect.left - parentRect.left) + "px";
}

function setActive(id) {
  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${id}`) {
      link.classList.add("active");
      updateIndicator(link);
    }
  });
}

sections.forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => setActive(section.id),
    onEnterBack: () => setActive(section.id)
  });
});

