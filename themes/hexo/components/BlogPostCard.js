import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'
import { BlogPostCardInfo } from './BlogPostCardInfo'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview =
    siteConfig('HEXO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  if (
    post &&
    !post.pageCoverThumbnail &&
    siteConfig('HEXO_POST_LIST_COVER_DEFAULT', null, CONFIG)
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover =
    siteConfig('HEXO_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail &&
    !showPreview

  // 卡片交错布局的样式
  const cardLayoutClass = siteConfig('HEXO_POST_LIST_IMG_CROSSOVER', null, CONFIG) && index % 2 === 1 
    ? 'md:flex-row-reverse' 
    : 'md:flex-row'

  return (
    <div
      data-aos='fade-up'
      data-aos-easing='ease-in-out'
      data-aos-duration='500'
      data-aos-once='false'
      data-aos-anchor-placement='top-bottom'
      className={`${siteConfig('HEXO_POST_LIST_COVER_HOVER_ENLARGE', null, CONFIG) ? ' hover:scale-110 transition-all duration-150' : ''}`}>
      
      {/* 
        这里是新的液态玻璃结构。
        我们使用 `.dock` 类来获得一个比较适合卡片的圆角和边距。
      */}
      <div className="liquidGlass-wrapper dock">
        <div className="liquidGlass-effect"></div>
        <div className="liquidGlass-tint"></div>
        <div className="liquidGlass-shine"></div>
        
        {/* 内容层，我们在这里重建卡片的内部布局 */}
        <div className="liquidGlass-text w-full">
          
          {/* 
            这个 div 用来模仿原来卡片的 flex 布局。
            它包含了交错布局的逻辑。
          */}
          <div
            id='blog-post-card-inner'
            className={`w-full flex justify-between flex-col-reverse ${cardLayoutClass}`}>
            
            {/* 文字内容 - 完全保留，不做修改 */}
            <BlogPostCardInfo
              index={index}
              post={post}
              showPageCover={showPageCover}
              showPreview={showPreview}
              showSummary={showSummary}
            />

            {/* 图片封面 */}
            {showPageCover && (
              
              <div className='md:w-5/12 w-full overflow-hidden relative'>
                <div className='w-full pt-[56.25%] relative'> {/* 16:9 高度 = 9/16 = 56.25% */}
                  <Link href={post?.href} className='absolute top-0 left-0 w-full h-full block'>
                    <LazyImage
                      priority={index === 1}
                      alt={`封面图 - ${post?.title}`}
                      src={post?.pageCoverThumbnail}
                      className='w-full h-full object-cover'
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPostCard
