import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import CONFIG from '../config'
import { BlogPostCardInfo } from './BlogPostCardInfo'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview =
    siteConfig('HEXO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap

  const pageCover = post?.pageCoverThumbnail ||
    (siteConfig('HEXO_POST_LIST_COVER_DEFAULT', null, CONFIG) ? siteInfo?.pageCover : null)

  const showPageCover =
    siteConfig('HEXO_POST_LIST_COVER', null, CONFIG) &&
    pageCover &&
    !showPreview

  // 卡片交错布局样式
  const cardLayoutClass =
    siteConfig('HEXO_POST_LIST_IMG_CROSSOVER', null, CONFIG) && index % 2 === 1
      ? 'md:flex-row-reverse'
      : 'md:flex-row'

  return (
    <div
      data-aos='fade-up'
      data-aos-easing='ease-in-out'
      data-aos-duration='500'
      data-aos-once='false'
      data-aos-anchor-placement='top-bottom'
      className={`${siteConfig('HEXO_POST_LIST_COVER_HOVER_ENLARGE', null, CONFIG)
        ? ' hover:scale-110 transition-all duration-150'
        : ''
        }`}
    >
      {/* 液态玻璃结构 */}
      <div className="liquidGlass-wrapper dock">
        <div className="liquidGlass-effect"></div>
        <div className="liquidGlass-tint"></div>
        <div className="liquidGlass-shine"></div>

        {/* 内容层 */}
        <div className="liquidGlass-text w-full">
          <div
            id="blog-post-card-inner"
            className={`w-full flex justify-between flex-col-reverse ${cardLayoutClass}`}
          >
            {/* 文本信息组件 */}
            <BlogPostCardInfo
              index={index}
              post={post}
              showPageCover={showPageCover}
              showPreview={showPreview}
              showSummary={showSummary}
            />

            {/* 封面图 */}
            {showPageCover && (
              <div className="md:w-5/12 w-full overflow-hidden relative">
                <div className="w-full pt-[56.25%] relative"> {/* 16:9 高宽比 */}
                  <Link href={post?.href} className="absolute top-0 left-0 w-full h-full block">
                    <LazyImage
                      priority={index === 1}
                      alt={`封面图 - ${post?.title}`}
                      src={pageCover}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPostCard
