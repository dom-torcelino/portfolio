//magnetic cursor initialization
console.clear();
const element = document.querySelector(".cursor1");
const target = document.querySelector(".target");
const text = document.querySelector(".itemTarget");

//navbar overlay initialization
const menuBtn = document.querySelector(".menu-div");
const exitBtn = document.querySelector(".exit");
var first_click = true;
let icon = document.querySelector(".menu_icon");

//cursor grow initialization
const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('.hoverable');

//slider next function
let slides =  document.querySelectorAll('.slide-container');
let index = 0;
var interval;



// Listeners
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
  $hoverables[i].addEventListener('mouseenter', onMouseHover);
  $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

// TEXT STAGGER IN ANIMATION
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting) {
          entry.target.classList.add('show');
      } 
        //comment this for no looping
      // else {
      //     entry.target.classList.remove('show');
      // }
  });
});


const hiddenElements = document.querySelectorAll('.hidden');
  //comment this for no looping
hiddenElements.forEach((el) => observer.observe(el));

//previous function
function next() {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
  clearInterval(interval);
  interval = setInterval(next, 7000);
}

//auto play
function prev() {
  slides[index].classList.remove('active');
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add('active');
  clearInterval(interval);
  interval = setInterval(next, 8000);
 
}

//slides changes every 7 seconds
interval = setInterval(next, 7000);

//magnetic cursor functionality
class Cursor {
  constructor(el, target, text) {
    this.el = el;
    this.target = target;
    this.itemTarget = text;
    // this.triggerDistance = this.target.getBoundingClientRect().width; 
    this.bind();
  }

  bind() {
    document.addEventListener("mousemove", this.move.bind(this), false);
  }

  move(e) {
    const cursorPosition = {
      left: e.clientX,
      top: e.clientY
    };

    document.querySelectorAll(".target").forEach((single) => {
      const triggerDistance = single.getBoundingClientRect().width;

      const targetPosition = {
        left:
          single.getBoundingClientRect().left +
          single.getBoundingClientRect().width / 1,
        top:
          single.getBoundingClientRect().top +
          single.getBoundingClientRect().height / 1
      };
      const distance = {
        x: targetPosition.left - cursorPosition.left,
        y: targetPosition.top - cursorPosition.top
      };

      const angle = Math.atan2(distance.x, distance.y);
      const hypotenuse = Math.sqrt(
        distance.x * distance.x + distance.y * distance.y
      );

      if (hypotenuse < triggerDistance) {

        //grow cursor
        TweenMax.to(this.el, 0.2, {
          left: targetPosition.left - (Math.sin(angle) * hypotenuse) / 1,
          top: targetPosition.top - (Math.cos(angle) * hypotenuse) / 1,
          // height: single.clientHeight,
          // width: single.clientWidth,
          // backgroundColor: "white",
          
        });
        TweenMax.to(single.querySelector(".itemTarget"), 0.2, {
          x: -((Math.sin(angle) * hypotenuse) / 3),
          y: -((Math.cos(angle) * hypotenuse) / 3)
        });
      } else {
        TweenMax.to(this.el, 0.2, {
          left: cursorPosition.left,
          top: cursorPosition.top,
          height: "12px",
          width: "12px",
          duration: 0.3,
        });

        TweenMax.to(single.querySelector(".itemTarget"), 0.2, {
          x: 0,
          y: 0
        });
      }
    });
  }
}
const cursor = new Cursor(element, target);

//navbar overlay functionality

let t1 = gsap.timeline({ paused: true });
t1.to(".menu", { opacity: 1, duration: 1, top: 0, ease: Power2.easeInOut });
t1.to(
    ".nav",
    {
        opacity: 1,
        marginBottom: 0,
        duration: 1,
        ease: Power2.easeInOut,
        stagger: 0.3,
    },
    ">-0.5"
);



menuBtn.onclick = function() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    if (first_click) {
        // do stuff for first click
        t1.play().timeScale(2);
        first_click = false;
        document.querySelector('.right-nav').disabled = true;
        window.onscroll = function() {
          window.scrollTo(scrollLeft, scrollTop);
      };
       
    } else {
        t1.timeScale(2.5);
        t1.reverse();
        first_click = true;
        // do stuff for second click
        document.querySelector('.right-nav').disabled = false;
        window.onscroll = function() {};
    }
}


// Move the cursor
function onMouseMove(e) {
  TweenMax.to($bigBall, .3, {
    x: e.clientX - 15,
    y: e.clientY - 15
  })
  TweenMax.to($smallBall, .1, {
    x: e.clientX - 5,
    y: e.clientY - 12
  })
}

// Hover an element
function onMouseHover() {
  TweenMax.to($bigBall, .1, {
    scale: 3.3
  })
  TweenMax.to($smallBall, .1, {
    scale: 2.3
  })
}
function onMouseHoverOut() {
  TweenMax.to($bigBall, .2, {
    scale: .7
  })
  TweenMax.to($smallBall, .1, {
    scale: 1
  })
} 

// START gallery item filter
  
const filterButtons = document.querySelector("#filter-btns").children;
const items = document.querySelector(".portfolio-gallery").children;
  
for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
        for (let j = 0; j < filterButtons.length; j++) {
            filterButtons[j].classList.remove("active")
        }
        this.classList.add("active");
        const target = this.getAttribute("data-target")
  
        for (let k = 0; k < items.length; k++) {
            items[k].style.display = "none";
            if (target == items[k].getAttribute("data-id")) {
                items[k].style.display = "block";
            }
            if (target == "all") {
                items[k].style.display = "block";
            }
        }
  
    })
}


// END gallery item filter