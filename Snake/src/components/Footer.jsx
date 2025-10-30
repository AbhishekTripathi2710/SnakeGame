import { FaGithub, FaLinkedin, FaCode } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="w-full bg-[#0D0D0D] text-[#EAEAEA] pb-4 pt-2 flex flex-col items-center mt-auto text-center border-top" style={{borderTop:'1px solid #3A3A3A'}}>
            <div className="mb-2 flex flex-row justify-center gap-x-4">
                <a href="https://www.linkedin.com/in/abhishek-tripathi-740938251/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00BFFF] text-2xl"><FaLinkedin /></a>
                <a href="https://github.com/AbhishekTripathi2710" target="_blank" rel="noopener noreferrer" className="hover:text-[#00BFFF] text-2xl"><FaGithub /></a>
                <a href="https://leetcode.com/u/ronalabhishek/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00BFFF] text-2xl"><FaCode /></a>
            </div>
            {/* <div className="text-sm" style={{color:'#EAEAEA'}}>Connect via LinkedIn / View on GitHub / View on LeetCode</div */}
            <div className="font-semibold mt-0.5" style={{color:'#EAEAEA'}}>Snake Game</div>
            <div className="text-xs italic" style={{color:'#EAEAEA'}}>Created By Abhishek Tripathi</div>
        </footer>
    )
}

export default Footer;