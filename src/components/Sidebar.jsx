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
import { AiFillPicture, AiTwotoneEdit } from 'react-icons/ai'
import { TbTallymark1 } from 'react-icons/tb'
import useSound from 'use-sound';
import GameLogic from './GameLogic';

const Sidebar = ({images, onBackgroundChange}) => {
	// separate state for rendering options
	const [collapse, setCollapse] = useState(false);
	const [numTowers, setNumTowers] = useState(3);
	const [numDiscs, setNumDiscs] = useState(3);
	const [source, setSource] = useState(0);
	const [destination, setDestination] = useState(numTowers-1);
	const [animate, setAnimate] = useState(false);
	const [click] = useSound(process.env.PUBLIC_URL + "/sounds/click.mp3");

	// common slider props
	const sliderProps = {
		getAriaValueText: (value) => value,
		valueLabelDisplay: "auto",
		size: "small",
		step: 1,
		marks: true,
		min: 3,
		max: 7
	}

	// produces tower item containing tower icons 
	const towerItem = (dir, set) => (
		<div className="towerItem">
			{/* tower icons generation */}
			{[...Array(numTowers)].map((_,i) => 
				<span className="towerIcon" 
					style={{ background: `linear-gradient(transparent 50%, ${i === dir ? "DeepSkyBlue" : "Cyan"} 50%` }}
					onClick={() => {
						if (i !== (dir === source ? destination : source)) {
							set(i);
							click();
						}
					}}
				>
					<TbTallymark1 
						color={i === dir ? "RoyalBlue" : "LightSeaGreen"}
						size={35}
					/>
				</span>
			)}
		</div>
	);

	return (
		<>
			<ProSidebar collapsed={collapse}>
				<IconContext.Provider className="sidebar" value={{ color: "LightSeaGreen" }}>
					<SidebarHeader>
						<Menu iconShape="circle">
							<MenuItem icon={<FaCog />} onClick={() => setCollapse(!collapse)}>
								OPTIONS
							</MenuItem>
						</Menu>
					</SidebarHeader>
					<SidebarContent>
						<Menu iconShape="circle">
							<SubMenu title="Number of Towers" icon={<FaGripLinesVertical />} >
								<div className="sliderWrapper" style={{ paddingTop: collapse && 20 }}> 
									<Slider
										{...sliderProps}
										onChangeCommitted={(_, newVal) => {
											setNumTowers(newVal)
											setDestination(newVal-1);
										}}
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
							<SubMenu title="Source Tower" icon={<FaChevronUp />}>
								{towerItem(source, setSource)}
							</SubMenu>
							<SubMenu title="Destination Tower" icon={<FaChevronDown />}>
								{towerItem(destination, setDestination)}
							</SubMenu>
							<SubMenu title="Themes" icon={<AiFillPicture />}>
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
							<SubMenu title="Material" icon={<AiTwotoneEdit />}>
							</SubMenu> 
							<MenuItem 
								icon={animate ? <FaPause /> : <FaPlay />} 
								onClick={() => setAnimate(!animate)}
							>
								Animate
							</MenuItem>
							<MenuItem
								icon={<FaRedo />}
								onClick={() => {}}
							>
								Restart
							</MenuItem>
						</Menu> 
					</SidebarContent>
					<SidebarFooter>
						<Menu iconShape="circle">
							<MenuItem icon={collapse ? <FaGithub /> : ""} >
								<a 
									className="footerButton"
									href="https://github.com/vjiang10/towers-of-hanoi" 
									target="_blank"
									rel="noreferrer"
								>
									<FaGithub />
									<span style={{ padding: 5 }}>View Source</span>
								</a>  
							</MenuItem>
						</Menu>
					</SidebarFooter>
				</IconContext.Provider>
			</ProSidebar>
			<div className="content">
				<GameLogic 
					numTowers={numTowers} 
					numDiscs={numDiscs} 
					source={source} 
					destination={destination}
					animate={animate}
				/>
			</div>
		</>
	);
}

export default Sidebar;

/** dest 
 * <div className="towerItem">
									{[...Array(numTowers)].map((_,i) => 
										<span className="towerIcon" 
											onClick={() => {
												if (i !== source) {
													setDestination(i);
													click();
												}
											}}
										>
											<TbTallymark1 
												color={i === destination ? "RoyalBlue" : "LightSeaGreen"}
												size={35}
											/>
										</span>
									)}
								</div>
*/