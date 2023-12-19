import React from 'react';

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 50, color = '#000000' }) => {
  const loaderStyle: React.CSSProperties = {
    border: `4px solid ${color}`,
    borderTop: `4px solid transparent`,
    borderRadius: '50%',
    width: size,
    height: size,
    position: 'fixed',
    top: '50%',
    left: '50%',
    animation: 'spin 1s linear infinite',
  };

  const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

  return (
    <div>
      <style>{keyframes}</style>
      <div style={loaderStyle}></div>
    </div>
  );
};

export default Loader;
