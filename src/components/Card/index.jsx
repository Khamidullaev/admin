import React from "react"

export default function CardContent({
  title,
  children,
  extra,
  className,
  style,
  headerStyle,
  headerClass,
  bodyStyle,
  bodyClass,
  filters,
  boldTitle,
  ...args
}) {
  return (
    <div className={`${className} rounded-lg bg-white`} style={style} {...args}>
      {title || extra ? (
        <div
          style={headerStyle}
          className={`px-5 py-4 border-b flex justify-between items-center rounded-t-lg ${headerClass}`}
        >
          <div className={`font-semibold ${boldTitle ? 'text-2xl' : 'text-lg'}`}  style={{ color: "#5B6871" }}>
            {title}
          </div>
          <div>{extra}</div>
        </div>
      ) : (
        <></>
      )}
      {filters ? (
        <div
          style={headerStyle}
          className={`px-5 py-4 border-b flex justify-between items-center rounded-t-lg ${headerClass}`}
        >
          <div>{filters}</div>
        </div>
      ) : (
        ""
      )}
      <div className="p-6" style={bodyStyle}>
        {children}
      </div>
    </div>
  )
}
