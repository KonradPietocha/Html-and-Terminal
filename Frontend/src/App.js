import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './Components/navbar'
import Home from './pages/Home';
import Cmd from './pages/Cmd';
import About from './pages/About';


function App() {
	const [light, setTheme] = useState(true);

	return (
		<React.Fragment>
			<button className="darkmode" onClick={(e) => {
				setTheme(!light);
				e.target.classList.toggle("dark-switch");
				// e.target.textContent = light ? "Light" : "Dark";
			}}>
				{light ? "Dark" : "Light"}
			</button>

			<div className={`main ${light ? "light" : "dark"}`}>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home/>} />
					<Route path='/cmd' element={<Cmd/>} />
					<Route path='/about' element={<About />} />
				</Routes>
			</div>
		</React.Fragment>
	);
}

export default App;