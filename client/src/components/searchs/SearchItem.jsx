const SearchItem = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center border-r-2 relative">
      <h3 className="font-bold text-main-700">{title}</h3>
      {children}
    </div>
  )
}

export default SearchItem
