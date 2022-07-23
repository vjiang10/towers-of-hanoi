import React from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

// Contains components with tooltip descriptions to be used in Sidebar.jsx

// returns procedure rules and objectives
export const ProcedureTooltip = ({ procedure }) => 
  procedure === 0 ? 
  <p>
    <b>Rules:</b> <br />
    <b>1.</b> Larger discs cannot be placed on top of smaller discs <br />
    <br />
    <b>Objectives:</b> <br />
    <b>1.</b> Move all discs from the source (<FaChevronUp />) tower to the destination (<FaChevronDown />) tower
  </p> :
  procedure === 1 ? 
  <p>
    <b>Rules:</b> <br />
    <b>1.</b> Larger discs cannot be placed on top of smaller discs (Same size discs can) <br />
    <br />
    <b>Objectives:</b> <br />
    <b>1.</b> Separate the total number of discs evenly, half on the source (<FaChevronUp />) tower and half on the destination (<FaChevronDown />) tower <br />
    <b>2.</b> Make both towers monochrome: <span style={{ color: "Cyan" }}>cyan</span> for <FaChevronUp /> tower and <span style={{ color: "LightBlue" }}>light blue</span> for <FaChevronDown /> tower
  </p> :
  procedure === 2 ? 
  <p>
    <b>Rules:</b> <br />
    <b>1.</b> Larger discs cannot be placed on top of smaller discs <br />
    <b>2.</b> In a single move, discs can only be moved to adjacent towers <br />
    <br />
    <b>Objectives:</b> <br />
    <b>1.</b> Move all discs from the source (<FaChevronUp />) tower to the destination (<FaChevronDown />) tower
  </p> :
  <p></p>

export const RulesTooltip = () =>
  <p>Set puzzle rules and type</p> 

export const TowerTooltip = () =>
  <p>Set the number of towers</p>

export const DiscTooltip = () =>
  <p>Set the number of discs</p>

export const SourceTooltip = () =>
  <p>Set the source tower, where initial discs are generated</p>

export const DestTooltip = () => 
  <p>Set the destination tower, to where discs have to be moved</p>

export const ThemeTooltip = () =>
  <p>Set the background image</p>

export const MaterialTooltip = () =>
  <p>Set the material with which disc and tower components are generated</p>

export const AnimateTooltip = () => 
  <p>Toggle solution animation by clicking on the icon or using the spacebar <br/ > You can pause animation by clicking anywhere </p>