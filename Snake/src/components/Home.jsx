import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col bg-[#0D0D0D] text-[#EAEAEA]">
            <Header />
            <main className="flex flex-1 flex-col items-center justify-center">
                <div className="bg-[#1A1A1A] rounded-2xl shadow-lg p-10 w-full max-w-md flex flex-col items-center border border-[#3A3A3A]">
                    <h2 className="text-3xl font-extrabold mb-3 text-center">Ready to Play?</h2>
                    <span className="text-5xl mb-2">
                        <span role="img" aria-label="snake">🐍</span>
                    </span>
                    <div className="mb-4 text-center text-lg text-[#EAEAEA]">Use Arrow Keys to control the snake.</div>
                    <button
                        onClick={() => navigate('/game')}
                        className="mt-2 mb-3 px-8 py-3 rounded-lg text-lg font-bold bg-[#00BFFF] text-[#0D0D0D] hover:bg-[#00a6e6] transition duration-150 focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:ring-opacity-70"
                        style={{ boxShadow: '0 0 18px #9D4EDD55' }}
                    >
                        Start Game
                    </button>
                    <div className="text-sm" style={{color:'#EAEAEA'}}>Try to eat the pink-red dots <span style={{color:'#FF3C7D'}}>(food)</span>!</div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;