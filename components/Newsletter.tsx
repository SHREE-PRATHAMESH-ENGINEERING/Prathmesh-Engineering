import React from 'react'

const Newsletter = () => {
  return (
    <div className="pcb-hero-bg pcb-pattern py-5 sm:py-24 lg:py-20 relative overflow-hidden">
      {/* Animated PCB Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-1 circuit-flow opacity-40"></div>
      <div className="absolute bottom-1/4 right-10 w-16 h-1 circuit-flow opacity-50" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-10 right-1/4 w-6 h-6 bg-[#5068a4] rounded-full electric-pulse opacity-60"></div>
      
      <div className="mx-auto grid justify-items-center max-w-screen-2xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 relative z-10">
        <div className="max-w-xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:col-span-7 text-animate">
          <h2 className="inline sm:block lg:inline xl:block max-sm:text-xl text-[#5068a4] text-glow">Stay updated on PCB innovations</h2>{' '}
          <p className="inline sm:block lg:inline xl:block max-sm:text-xl text-gray-700">Get the latest in PCB technology and offers.</p>
        </div>
        <form className="w-full max-w-md lg:col-span-5 lg:pt-2 animate-in-right">
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 shadow-lg placeholder:text-gray-400 focus:border-[#5068a4] focus:ring-2 focus:ring-[#5068a4] focus:ring-opacity-30 transition-all duration-300 sm:text-sm sm:leading-6"
              placeholder="Enter your email for PCB updates"
            />
            <button
              type="submit"
              className="btn-pcb-hero flex-none rounded-xl px-6 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-sm leading-6 text-gray-700 text-animate-delay">
            We care about your data. Read our{' '}
            <a href="#" className="font-semibold text-[#5068a4] hover:text-[#3d5998] transition-colors duration-300">
              privacy&nbsp;policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  )
}

export default Newsletter