import React, { useState } from 'react';
import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { IconContext } from 'react-icons';
import { FaGithub, FaGripLinesVertical, FaGripLines, FaEllipsisV } from 'react-icons/fa';
import { AiOutlinePicture } from 'react-icons/ai'
import GameLogic from './GameLogic';

const Sidebar = ({images, onBackgroundChange}) => {
	// separate rendering options
	const options = [3,4,5,6,7,8,9,10];
	const [numTowers, setNumTowers] = useState(3);
	const [numDiscs, setNumDiscs] = useState(3);
	const [click, setClick] = useState(false);

	// useEffect with dependency array on numTowers and numDiscs (which resets setup and calls on initial frop animation)
	// Don't forget to return removeEventListener if needed
	
	return (
		<div className="sidebar">
		<IconContext.Provider value={{ color: "LightSeaGreen" }}>
			<ProSidebar collapsed={click}>
				<SidebarHeader>
					<Menu iconShape="circle">
						<MenuItem icon={<FaEllipsisV />} onClick={() => setClick(click ? false : true)}>
							OPTIONS
						</MenuItem>
					</Menu>
				</SidebarHeader>
				<SidebarContent>
					<Menu iconShape="circle">
						<SubMenu title="Number of Towers" icon={<FaGripLinesVertical />}>
							<select value={numTowers} onChange={({target}) => setNumTowers(target.value)}>
								{options.map((option) => 
								<option key={option.toString()} value={option}>{option}</option>)}
							</select>
						</SubMenu>
						<SubMenu title="Number of Discs" icon={<FaGripLines />}>
							<select value={numDiscs} onChange={({target}) => setNumDiscs(target.value)}>
								{options.map((option) => 
								<option key={option.toString()} value={option}>{option}</option>)}
							</select>
						</SubMenu>
						<SubMenu title="Themes" icon={<AiOutlinePicture />}>
							{images.map((image, index) => 
								<MenuItem key={image}>
									<div onClick={() => onBackgroundChange(index)}>
										{image[0].toUpperCase() + image.substring(1)}
									</div>
								</MenuItem>
							)}
						</SubMenu>
					</Menu> 
				</SidebarContent>
				<SidebarFooter>
					<Menu iconShape="circle">
						<MenuItem icon={click ? <FaGithub /> : ""}>
							<a 
								className="footerButton"
								href="https://github.com/vjiang10/towers-of-hanoi" 
								target="_blank"
								rel="noreferrer"
							>
								<FaGithub />
								<div style={{ padding: 5 }}>View Source</div>
							</a>  
						</MenuItem>
					</Menu>
				</SidebarFooter>
			</ProSidebar>
			<GameLogic numTowers={numTowers} numDiscs={numDiscs} />
		</IconContext.Provider>
		</div>
	);
}

export default Sidebar;