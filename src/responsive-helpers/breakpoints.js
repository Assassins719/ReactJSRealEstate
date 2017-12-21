import React from 'react';
import Responsive from 'react-responsive';

export const DesktopBreakpoint = ({ children }) =>
  <Responsive minWidth={992} children={children} />;
export const TabletBreakpoint = ({ children }) =>
  <Responsive minWidth={768} maxWidth={992} children={children} />;
export const MobileBreakpoint = ({ children }) =>
  <Responsive maxWidth={768} children={children} />;
export const DefaultBreakpoint = ({ children }) =>
  <Responsive minWidth={768} children={children} />;
