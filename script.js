function init() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });


    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

}

init()

document.addEventListener("mousemove", function (dets) {
    gsap.to(".crsr", {
        left: dets.x,
        top: dets.y
    })
})

gsap.from(".page1 .center h1", {
    y: 30,
    opacity: 0,
})

gsap.from(".page1 .center h2", {
    y: 30,
    opacity: 0,
    delay: .3
})

gsap.from(".page2 .box", {
    x: "-630%",
    duration: 10,
    scrollTrigger: {
        trigger: ".page1 .center h1",
        scroller: ".main",
        // markers:true,
        start: "top -40%",
        end: "top -70%",
        scrub: 2
    }
})

let tl5 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page3",
        scroller: ".main",
        start: "top 10%",
        end: "top 0%",
        scrub: 3
    }
})

tl5.from(".page3 h2,.page3 h1,.page3 p", {
    y: 100,
    opacity: 0,
    duration: .8,
})

let ling = document.querySelectorAll(".page1 .navbar .middle a")
let drag = document.querySelector(".drag")
let crsr = document.querySelector(".crsr")

ling.forEach(function(val) {
    val.addEventListener("mouseenter", function(){
        crsr.style.height = "30px"
        crsr.style.width = "30px"
    })
    val.addEventListener("mouseleave", function(){
        crsr.style.height = "15px"
        crsr.style.width = "15px"
    })
})

drag.addEventListener("mouseenter", function () {
    crsr.style.height = "100px"
    crsr.style.width = "100px"
    crsr.innerHTML = "drag"
})

drag.addEventListener("mouseleave", function () {
    crsr.style.height = "15px"
    crsr.style.width = "15px"
    crsr.innerHTML = " "
})

let btn = document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        crsr.style.height = "30px"
        crsr.style.width = "30px"
        let x = e.offsetX;
        let y = e.offsetY;
        let btnWidth = btn.clientWidth;
        let btnHeight = btn.clientHeight;
        let transX = (x - btnWidth / 2);
        let transY = (y - btnHeight / 2);
        btn.style.transform = `translateX(${transX}px) translateY(${transY}px`;
    })
    btn.addEventListener("mouseout", function (e) {
        btn.style.transform = "";
        crsr.style.height = "15px"
        crsr.style.width = "15px"
    })
})
