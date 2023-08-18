const cursor = document.querySelector('[fc-cursor = cursor]')
  const cursorBackgroundColor = getComputedStyle(cursor).backgroundColor
  const follow = document.querySelector('[fc-cursor = follow]')
  const followWidth = getComputedStyle(follow).width
  const followHeight = getComputedStyle(follow).height
  const target = document.querySelector('[fc-cursor = target]')
  const buttons = document.querySelectorAll('[fc-cursor = button]')
  
  const cursorDuration = target.getAttribute('fc-cursor-duration') ?? '0.7'
  const cursorEasing = target.getAttribute('fc-cursor-easing') ?? 'power2.out'
  
  const cursorHoverDuration = target.getAttribute('fc-cursor-hover-duration') ?? '0.3'
  const cursorHoverEasing = target.getAttribute('fc-cursor-hover-easing') ?? 'power2.out'
  
  const cursorOpacityDuration = target.getAttribute('fc-cursor-opacity-duration') ?? '0.2'
  const cursorOpacityEasing = target.getAttribute('fc-cursor-opacity-easing') ?? 'power2.out'
  
  follow.style.opacity = 0
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

      gsap.to(follow, {
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
      gsap.to(follow, {
        width: followWidth,
        height: followHeight,
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
  	gsap.to(follow, {
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
  	gsap.to(follow, {
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
      gsap.to(follow, {
        left: event.clientX + "px",
        top: offsetY + "px",
        duration: cursorDuration,
        ease: cursorEasing
      })
    }
  })

</script>

<script>

	const copyScriptButtons = document.querySelectorAll('[fc-script = copy-btn]')
  const copyScriptButtonTexts = document.querySelectorAll('[fc-script = copy-btn-text]')
  const scripts = document.querySelectorAll('[fc-script-copy]')
  
  for(let i = 0; i < copyScriptButtons.length; i++)
  {
  	let copyScriptButton = copyScriptButtons[i]
    let copyScriptButtonText = copyScriptButtonTexts[i]
    let scriptText = scripts[i].getAttribute('fc-script-copy')
  
    copyScriptButton.addEventListener('click', () =>
    {
      navigator.clipboard.writeText(scriptText).then(
      () => {
        copyScriptButtonText.textContent = 'Copied!'
        setTimeout(() =>
        {
          copyScriptButtonText.textContent = 'Copy Script'
        }, 500)
      },
      () => {
        console.log('Ooops, not the anime I was looking for...')
      })
    })
  }
  
  const copyAttributeButtons = document.querySelectorAll('[fc-attribute = copy-btn]')
  let attributeTexts = []
  document.querySelectorAll('[fc-attribute-copy]')
  	.forEach((el) => attributeTexts.push(el.getAttribute('fc-attribute-copy')))
  
  for(let i = 0; i < copyAttributeButtons.length; i++)
  {
    copyAttributeButtons[i].addEventListener('click', () =>
    {
      navigator.clipboard.writeText(attributeTexts[i]).then(
      () => {
        copyAttributeButtons[i].classList.add('copied')
        setTimeout(() =>
        {
          copyAttributeButtons[i].classList.remove('copied')
        }, 700)
      },
      () => {
        console.log('Ooops, not the anime I was looking for...')
      })
    })
  }
