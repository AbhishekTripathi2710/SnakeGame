import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function GameOver() {
    const location = useLocation();
    const navigate = useNavigate();
    const cardRef = useRef(null);
    const score = (location.state && typeof location.state.score === 'number') ? location.state.score : 0;
    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.classList.add('animate-shake');
            setTimeout(() => {
                cardRef.current.classList.remove('animate-shake');
            }, 700);
        }
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center min-h-screen z-50">
            <Header></Header>
            <div ref={cardRef} className="bg-[#1A1A1A] rounded-2xl border border-[#3A3A3A] shadow-lg p-8 mt-[7rem] flex flex-col items-center min-w-[320px] max-w-xs transition-all">
                <h1 className="text-3xl font-extrabold mb-4" style={{color:'#FF3C7D'}}>Game Over</h1>
                <div className="text-lg mb-2" style={{color:'#EAEAEA'}}>Score: <span className="font-semibold" style={{color:'#FFD54F'}}>{score}</span></div>
                <div className="mt-6 flex gap-x-4">
                    <button className="px-5 py-2 rounded font-medium text-[#0D0D0D] transition" style={{background:'#00BFFF'}} onClick={() => navigate('/game', { replace: true })}>Play Again</button>
                    <button className="px-5 py-2 rounded font-medium text-[#EAEAEA] transition" style={{background:'#3A3A3A'}} onClick={() => navigate('/')}>Home</button>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default GameOver;