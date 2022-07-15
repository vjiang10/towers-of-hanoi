import React, { useState } from 'react';
import { 
	ProSidebar, 
	SidebarHeader, 
	SidebarContent, 
	SidebarFooter, 
	Menu, 
	MenuItem, 
	SubMenu 
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Slider } from '@mui/material';
import { IconContext } from 'react-icons';
import { 
	FaCog, 
	FaGripLinesVertical, 
	FaPlay, 
	FaPause, 
	FaGripLines, 
	FaChevronUp, 
	FaChevronDown,
	FaRedo, 
	FaGithub 
} from 'react-icons/fa';
import { AiOutlineCaretRight, AiFillPicture, AiTwotoneEdit } from 'react-icons/ai';
import { TbTallymark1 } from 'react-icons/tb';
import { IoMdHelp, IoMdMore } from 'react-icons/io';
import GameLogic from './GameLogic';

const Sidebar = ({images, onBackgroundChange}) => {
	// separate state for rendering options
	const [collapse, setCollapse] = useState(false);
	const [procedure, setProcedure] = useState(0);
	const [numTowers, setNumTowers] = useState(3);
	const [numDiscs, setNumDiscs] = useState(3);
	const [source, setSource] = useState(0);
	const [destination, setDestination] = useState(numTowers-1);
	const [animate, setAnimate] = useState(false);
	const [playRate, setPlayRate] = useState(1);

	// common slider props
	const sliderProps = {
		getAriaValueText: (value) => value,
		valueLabelDisplay: "auto",
		size: "small",
		step: 1,
		marks: true,
		min: 3,
		max: 7
	};

	// produces tower item containing tower icons 
	const towerItem = (dir, set) => (
		<div className="towerItem">
			{/* tower icons generation, loops through array of length numTowers */}
			{[...Array(numTowers)].map((_, index) => 
				<span className="towerIcon" 
					key={index}
					style={{ 
						background: `linear-gradient(transparent 50%, ${index === dir ? "DeepSkyBlue" : "Cyan"} 50%` 
					}}
					onClick={() => index !== source && index !== destination && set(index)}
				>
					<TbTallymark1 
						color={index === dir ? "RoyalBlue" : "LightSeaGreen"}
						size={35}
					/>
				</span>
			)}
		</div>
	);

	// array containing string elements representing choices for different types of game rules/procedures
	const procedures = ["Standard", "Adjacent (Coming Soon!)", "Magnetic (Coming Soon!)", "Bicolor (Coming Soon!)"];

	return (
		<>
			<ProSidebar collapsed={collapse}>
				<IconContext.Provider className="sidebar" value={{ color: "LightSeaGreen" }}>
					<SidebarHeader>
						<Menu iconShape="circle">
							<MenuItem icon={<FaCog/>} onClick={() => setCollapse(!collapse)}>
								OPTIONS
							</MenuItem>
						</Menu>
					</SidebarHeader>
					<SidebarContent>
						<Menu iconShape="circle">
							<SubMenu title="Rules and Variants" icon={<IoMdMore size="1.5em"/>}>
								{procedures.map((option, index) => 
									<MenuItem 
										icon={option === procedures[procedure] && <AiOutlineCaretRight/>}
										style={{ color: option === procedures[procedure] ? "#ADADAD" : "LightSeaGreen" }} 
										onClick={() => setProcedure(index)}
									>
										{option}
									</MenuItem>
								)}
							</SubMenu>
							<SubMenu title="Number of Towers" icon={<FaGripLinesVertical/>}>
								<div className="sliderWrapper" style={{ paddingTop: collapse && 20 }}> 
									<Slider
										{...sliderProps}
										defaultValue={numTowers}
										onChangeCommitted={(_, newVal) => {
											setNumTowers(newVal)
											// limit destiation and source to newVal-1
											// ensure destination and source cannot be set on top of each other
											destination < newVal || setDestination(newVal-1 - (source === newVal-1 ? 1 : 0));
											source < newVal || setSource(newVal-1 - (destination === newVal-1 ? 1 : 0));
										}}
									/>
								</div>
							</SubMenu>
							<SubMenu title="Number of Discs" icon={<FaGripLines/>}>
								<div className="sliderWrapper" style={{ paddingTop: collapse && 20 }}>
									<Slider
										{...sliderProps}
										defaultValue={numDiscs}
										onChangeCommitted={(_, newVal) => setNumDiscs(newVal)}
									/>
								</div>
							</SubMenu>
							<SubMenu title="Source Tower" icon={<FaChevronUp/>}>
								{towerItem(source, setSource)}
							</SubMenu>
							<SubMenu title="Destination Tower" icon={<FaChevronDown/>}>
								{towerItem(destination, setDestination)}
							</SubMenu>
							{/* theme options (sets background image) */}
							<SubMenu title="Themes" icon={<AiFillPicture/>}>
								{images.map((image, index) => 
									<div className="themeItem"
										key={image} 
										style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${images[index]}.jpg)` }}
										onClick={() => onBackgroundChange(index)}
									>
										<MenuItem>
											{image[0].toUpperCase() + image.substring(1)}
										</MenuItem>
									</div>
								)}
							</SubMenu>
							<SubMenu title="Material" icon={<AiTwotoneEdit/>}>
							</SubMenu>
							{animate ? 
								// if animate, attach additional menuItem containing rate slider
								<SubMenu 
									title="Animate" 
									icon={<FaPause onClick={() => setAnimate(false)}/>}
									// only responds to clicking parent component (seen as icon) upon collapsed sidebar
									onClick={(event) =>
										collapse && event.target === event.currentTarget && setAnimate(false)
									}
								>
									<span>Play Rate</span>
									<div className="sliderWrapper">
										<Slider 
											getAriaValueText={(value) => (value)}
											defaultValue={1}
											step={0.01}
											min={0}
											max={2}
											// slider values goes from 0 (mapping to 50%) all the way to 2 (mapping to 200%)
											marks={[{value: 0, label: <span style={{ color: "#ADADAD" }}>50%</span>}, 
															{value: 1, label: <span style={{ color: "#ADADAD" }}>100%</span>}, 
															{value: 2, label: <span style={{ color: "#ADADAD" }}>200%</span>}]}
											// if newVal is less than 1, then set play rate to 1/(2-newVal), else set to newVal
											onChangeCommitted={(_, newVal) => setPlayRate(newVal < 1 ? 1/(2-newVal) : newVal)}
										/>
									</div>
								</SubMenu>
								:
								// if !animate, render icon only
								<MenuItem icon={<FaPlay onClick={() => setAnimate(true)}/>}>
									Animate
								</MenuItem>
							}
							<MenuItem
								icon={<FaRedo/>}
								onClick={() => {}}
							>
								Restart
							</MenuItem>
							{/* pop up info button: calls on pop up intro function in popUp.js */}
							<MenuItem
								icon={<IoMdHelp size="1.25em"/>}
								onClick={()=>{}}
							>
								Help
							</MenuItem>
						</Menu> 
					</SidebarContent>
					<SidebarFooter>
						<Menu iconShape="circle">
							{/* if sidebar is collapsed, then attach icon */}
							<MenuItem icon={collapse ? <FaGithub/> : ""} >
								<a 
									className="footerButton"
									href="https://github.com/vjiang10/towers-of-hanoi" 
									target="_blank"
									rel="noreferrer"
								>
									<FaGithub/>
									<span style={{ padding: 5 }}>View Source</span>
								</a>  
							</MenuItem>
						</Menu>
					</SidebarFooter>
				</IconContext.Provider>
			</ProSidebar>
			{/* passing some state as props to GameLogic */}
			<div className="content">
				<GameLogic
					procedure={procedure}
					numTowers={numTowers} 
					numDiscs={numDiscs} 
					source={source} 
					destination={destination}
					animate={animate}
					playRate={playRate}
				/>
			</div>
		</>
	);
}

export default Sidebar;