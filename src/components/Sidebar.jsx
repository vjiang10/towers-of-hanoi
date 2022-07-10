import React, { useState } from 'react';
import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { IconContext } from 'react-icons';
import { FaGithub, FaGripLinesVertical, FaGripLines, FaEllipsisV } from 'react-icons/fa';
import { AiOutlinePicture } from 'react-icons/ai'
import { Slider } from '@mui/material';
import GameLogic from './GameLogic';

const Sidebar = ({images, onBackgroundChange}) => {
	// separate rendering options
	const [collapse, setCollapse] = useState(false);
	const [numTowers, setNumTowers] = useState(3);
	const [numDiscs, setNumDiscs] = useState(3);

	// common slider props
	const sliderProps = {
		getAriaValueText: (value) => value,
		valueLabelDisplay: "auto",
		size: "small",
		step: 1,
		marks: true,
		min: 3,
		max: 10
	}

	return (
		<>
			<IconContext.Provider className="sidebar" value={{ color: "LightSeaGreen" }}>
				<ProSidebar collapsed={collapse}>
					<SidebarHeader>
						<Menu iconShape="circle">
							<MenuItem icon={<FaEllipsisV />} onClick={() => setCollapse(collapse ? false : true)}>
								OPTIONS
							</MenuItem>
						</Menu>
					</SidebarHeader>
					<SidebarContent>
						<Menu iconShape="circle">
							<SubMenu title="Number of Towers" icon={<FaGripLinesVertical />}>
								<div className="sliderWrapper" style={{ paddingTop: collapse && 20 }}> 
									<Slider
										{...sliderProps}
										onChangeCommitted={(_, newVal) => setNumTowers(newVal)}
									/>
								</div>
							</SubMenu>
							<SubMenu title="Number of Discs" icon={<FaGripLines />}>
								<div className="sliderWrapper" style={{ paddingTop: collapse && 20 }}>
									<Slider
										{...sliderProps}
										onChangeCommitted={(_, newVal) => setNumDiscs(newVal)}
									/>
								</div>
							</SubMenu>
							<SubMenu title="Themes" icon={<AiOutlinePicture />}>
								{images.map((image, index) => 
									<div 
										key={image} 
										onClick={() => onBackgroundChange(index)}
										style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${images[index]}.jpg)`, backgroundSize:"cover"}}>
										<MenuItem>
											{image[0].toUpperCase() + image.substring(1)}
										</MenuItem>
									</div>
								)}
							</SubMenu>
						</Menu> 
					</SidebarContent>
					<SidebarFooter>
						<Menu iconShape="circle">
							<MenuItem icon={collapse ? <FaGithub /> : ""}>
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
			</IconContext.Provider>
			<div className="content">
				<GameLogic numTowers={numTowers} numDiscs={numDiscs} />
			</div>
		</>
	);
}

export default Sidebar;