import * as React from 'react';

export interface IAppProps {
  children?: React.ReactNode;
}

export function Layout(props: IAppProps) {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-ANC-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Company name */}
            <div className="flex-shrink-0">
              <span className="text-white font-bold">ANC Dashboard</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 m-auto">{props.children}</div>
      </div>
    </>
  );
}
