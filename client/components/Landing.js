import React from 'react'

export function Landing({firstName}) {
  if (firstName) {
    console.log('firstName --> ', firstName)
    return (
      <>
        <div>
          <div className="hero-image">
            <div className="hero-text">
              <span id="hero-h">Cozy Up, {firstName} </span>
              <span id="hero-p"> Find your perfect mug this season</span>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div>
        <div className="hero-image">
          <div className="hero-text">
            <span id="hero-h">Cozy Up </span>
            <span id="hero-p"> Find your perfect mug this season</span>
          </div>
        </div>
      </div>
    </>
  )
}

/* anime({
  targets: '#hero-text',
  translateX: [250, 100]
})
 */
