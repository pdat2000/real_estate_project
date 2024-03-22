const Home = () => {
  return (
    <div className="bg-white w-full">
      <div className="w-full h-fit relative">
        <img src="/banner.png" alt="banner" />
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-6 p-12">
          <h1 className="text-5xl text-white">Find Your Dream Home</h1>
          <span className="text-white text-lg flex flex-col items-center">
            <span>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere
            </span>
            <span>
              cubilia curae; Proin sodales ultrices nulla blandit volutpat.
            </span>
          </span>
        </div>
      </div>
      <div className="w-main m-auto">content</div>
    </div>
  )
}

export default Home
