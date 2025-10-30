function Header() {
    return (
        <header className="w-full flex flex-row justify-center items-center mt-4 mb-8">
            <h1 className="text-3xl font-extrabold tracking-wide text-[#EAEAEA] text-center">Snake Game</h1>
            <span className="ml-4 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full border-2 border-[#9D4EDD] flex items-center justify-center bg-[#0D0D0D]">
                    <span role="img" aria-label="gear" className="text-2xl">⚙️</span>
                </div>
            </span>
        </header>
    )
}

export default Header;