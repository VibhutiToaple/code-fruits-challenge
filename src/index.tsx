import "antd/dist/reset.css";
import React, { useState, DragEvent, FC, StrictMode, useEffect } from 'react';
import { createRoot } from "react-dom/client";

import ReactDOM from 'react-dom';

import App from "./App";
import ResizableDraggablePanel from './components/ResizableDraggablePanel';
import TermsIcon from './Icons/TermsIcon';
import AboutIcon from './Icons/AboutIcon';
import FruitViewIcon from './Icons/FruitViewIcon';
import { MainWorkspace } from './components/MainWorkspace';
import LoginComponent from './components/LoginComponent';
import UserProfile from './components/UserProfile';
import { panelList } from './panelList';


const container = document.getElementById("root");
if (!container) {
  throw new Error('Root container missing in index.html');
}
const root = createRoot(container);
root.render(<App />);
