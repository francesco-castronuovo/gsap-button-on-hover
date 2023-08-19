const cursor = document.querySelector('[fc-cursor = cursor]')
const cursorBackgroundColor = getComputedStyle(cursor).backgroundColor
const follower = document.querySelector('[fc-cursor = follower]')
const followerWidth = getComputedStyle(follower).width
const followerHeight = getComputedStyle(follower).height
const target = document.querySelector('[fc-cursor = target]')
const buttons = document.querySelectorAll('[fc-cursor = button]')
  
const cursorFollowerMoveDuration = target.getAttribute('fc-cursor-follower-move-duration') ?? '0.7'
const cursorFollowerMoveEasing = target.getAttribute('fc-cursor-follower-move-easing') ?? 'power2.out'
  
const cursorHoverDuration = target.getAttribute('fc-cursor-hover-duration') ?? '0.3'
const cursorHoverEasing = target.getAttribute('fc-cursor-hover-easing') ?? 'power2.out'
  
const cursorOpacityDuration = target.getAttribute('fc-cursor-opacity-duration') ?? '0.2'
const cursorOpacityEasing = target.getAttribute('fc-cursor-opacity-easing') ?? 'power2.out'
  
follower.style.opacity = 0
cursor.style.opacity = 0
  
for(const button of buttons)
{
  button.addEventListener('mouseenter', function(event)
  {
    const t = event.target
    const left = t.offsetLeft + t.clientWidth / 2
    const top = t.offsetTop + t.clientHeight / 2
    const width = t.clientWidth
    const height = t.clientHeight

    gsap.to(follower, {
      left: left + 'px',
      top: top + 'px',
      width: width + 'px',
      height: height + 'px',
      borderRadius: '0%', 
      duration: cursorHoverDuration,
      ease: cursorHoverEasing,
      overwrite: true
    })

    gsap.to(cursor, {
      backgroundColor: 'transparent',
      duration: cursorHoverDuration,
      ease: cursorHoverEasing,
    })
  })

  button.addEventListener('mouseleave', function(event)
  {        
    gsap.to(follower, {
      width: followerWidth,
      height: followerHeight,
      borderRadius: '100%', 
      duration: cursorHoverDuration,
      ease: cursorHoverEasing
    })

    gsap.to(cursor, {
      backgroundColor: cursorBackgroundColor,
      duration: cursorHoverDuration,
      ease: cursorHoverEasing,
    })
  })
}

target.addEventListener('mouseenter', function(event)
{
  gsap.to(follower, {
    opacity: 1,
    duration: cursorOpacityDuration,
    ease: cursorOpacityEasing
  })
    
  gsap.to(cursor, {
    opacity: 1,
    duration: cursorOpacityDuration,
    ease: cursorOpacityEasing
  })
})
  
target.addEventListener('mouseleave', function(event)
{
  gsap.to(follower, {
    opacity: 0,
    duration: cursorOpacityDuration,
    ease: cursorOpacityEasing
  })
    
  gsap.to(cursor, {
    opacity: 0,
    duration: cursorOpacityDuration,
    ease: cursorOpacityEasing
  })
})

target.addEventListener('mousemove', function(event)
{
  const t = event.target
  const targetY = target.getClientRects()[0].y
  const offsetY = event.clientY - targetY

  cursor.style.top = offsetY + "px"
  cursor.style.left = event.clientX + "px"

  if(t.tagName !== 'A')
  {	
    gsap.to(follower, {
      left: event.clientX + "px",
      top: offsetY + "px",
      duration: cursorFollowerMoveDuration,
      ease: cursorFollowerMoveEasing
    })
  }
})
