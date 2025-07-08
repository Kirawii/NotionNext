const Card = ({ children, headerSlot, className }) => {
  return (
    // 外层容器，用来控制卡片的宽度、外边距等。className 从外部传入。
    <div className={className}>
      
      {/* 可选的头部插槽，我们把它放在液态玻璃容器的外面 */}
      <>{headerSlot}</>

      {/* 
        这里是液态玻璃效果的核心结构。
        我们给它添加了 `.button` 类，来使用您 CSS 中定义的圆角和内外边距样式。
        您也可以换成 `.menu` 或 `.dock` 来获得不同的圆角和边距效果。
      */}
      <div className="liquidGlass-wrapper button">
        {/* 效果层 */}
        <div className="liquidGlass-effect"></div>
        <div className="liquidGlass-tint"></div>
        <div className="liquidGlass-shine"></div>

        {/* 
          内容层。
          我们把卡片的 {children} 放在这里。
          并添加了 p-4 和 text-black dark:text-white 来确保内容有内边距且颜色正确。
        */}
        <div className="liquidGlass-text w-full p-4 text-black dark:text-white">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Card
