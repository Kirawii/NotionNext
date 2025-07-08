import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import ButtonRandomPost from './ButtonRandomPost'
import CategoryGroup from './CategoryGroup'
import Logo from './Logo'
import { MenuListTop } from './MenuListTop'
import SearchButton from './SearchButton'
import SearchDrawer from './SearchDrawer'
import SideBar from './SideBar'
import SideBarDrawer from './SideBarDrawer'
import TagGroups from './TagGroups'

let windowTop = 0

/**
 * 顶部导航
 * @param {*} param0
 * @returns
 */
const Header = props => {
  const searchDrawer = useRef()
  const { tags, currentTag, categories, currentCategory } = props
  const { locale } = useGlobal()
  const router = useRouter()
  const [isOpen, changeShow] = useState(false)
  const showSearchButton = siteConfig('HEXO_MENU_SEARCH', false, CONFIG)
  const showRandomButton = site-config('HEXO_MENU_RANDOM', false, CONFIG)

  const toggleMenuOpen = () => {
    changeShow(!isOpen)
  }

  const toggleSideBarClose = () => {
    changeShow(false)
  }

  // 监听滚动
  useEffect(() => {
    window.addEventListener('scroll', topNavStyleHandler)
    router.events.on('routeChangeComplete', topNavStyleHandler)
    topNavStyleHandler()
    return () => {
      router.events.off('routeChangeComplete', topNavStyleHandler)
      window.removeEventListener('scroll', topNavStyleHandler)
    }
  }, [])

  const throttleMs = 200

  const topNavStyleHandler = useCallback(
    throttle(() => {
      const scrollS = window.scrollY
      // 主容器
      const nav = document.querySelector('#sticky-nav-wrapper') 
      // 液态玻璃的着色层，我们用它来控制背景
      const tint = document.querySelector('#liquid-glass-tint') 
      // 内容层，我们用它来控制文字颜色
      const text = document.querySelector('#liquid-glass-text-content')
      
      const header = document.querySelector('#header')
      const scrollInHeader = header && (scrollS < 10 || scrollS < header?.clientHeight - 50)

      if (scrollInHeader) {
        // 在头图内，设置为透明
        tint && tint.classList.add('opacity-0')
        text && text.classList.remove('text-black', 'dark:text-gray-200')
        text && text.classList.add('text-white')
      } else {
        // 不在头图内，恢复背景
        tint && tint.classList.remove('opacity-0')
        text && text.classList.remove('text-white')
        text && text.classList.add('text-black', 'dark:text-gray-200')
      }

      const showNav = scrollS <= windowTop || scrollS < 5 || (header && scrollS <= header.clientHeight + 100)
      
      if (!showNav) {
        nav && nav.classList.replace('top-0', '-top-20')
        windowTop = scrollS
      } else {
        nav && nav.classList.replace('-top-20', 'top-0')
        windowTop = scrollS
      }
    }, throttleMs)
  )

  const searchDrawerSlot = (
    <>
      {categories && (
        <section className='mt-8'>
          <div className='text-sm flex flex-nowrap justify-between font-light px-2'>
            <div className='text-gray-600 dark:text-gray-200'>
              <i className='mr-2 fas fa-th-list' />
              {locale.COMMON.CATEGORY}
            </div>
            <Link
              href={'/category'}
              passHref
              className='mb-3 text-gray-400 hover:text-black dark:text-gray-400 dark:hover:text-white hover:underline cursor-pointer'>
              {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />
            </Link>
          </div>
          <CategoryGroup
            currentCategory={currentCategory}
            categories={categories}
          />
        </section>
      )}

      {tags && (
        <section className='mt-4'>
          <div className='text-sm py-2 px-2 flex flex-nowrap justify-between font-light dark:text-gray-200'>
            <div className='text-gray-600 dark:text-gray-200'>
              <i className='mr-2 fas fa-tag' />
              {locale.COMMON.TAGS}
            </div>
            <Link
              href={'/tag'}
              passHref
              className='text-gray-400 hover:text-black  dark:hover:text-white hover:underline cursor-pointer'>
              {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />
            </Link>
          </div>
          <div className='p-2'>
            <TagGroups tags={tags} currentTag={currentTag} />
          </div>
        </section>
      )}
    </>
  )

  return (
    <div id='top-nav' className='z-40'>
      <SearchDrawer cRef={searchDrawer} slot={searchDrawerSlot} />

      {/* 导航栏 */}
      <div id='sticky-nav-wrapper' className='fixed top-0 w-full z-20 duration-300 transition-all'>
        <div className="liquidGlass-wrapper menu">
          {/* 效果层 */}
          <div className="liquidGlass-effect"></div>
          {/* 我们给着色层一个ID，用来控制它的透明度 */}
          <div id="liquid-glass-tint" className="liquidGlass-tint duration-300 transition-opacity"></div>
          <div className="liquidGlass-shine"></div>
          
          {/* 内容层 */}
          <div className="liquidGlass-text w-full">
            {/* 我们给实际内容一个ID和样式，用来控制文字颜色 */}
            <div id="liquid-glass-text-content" className="w-full flex justify-between items-center text-white duration-300 transition-colors">
              <div className='flex'>
                <Logo {...props} />
              </div>

              {/* 右侧功能 */}
              <div className='mr-1 flex justify-end items-center '>
                <div className='hidden lg:flex'>
                  {' '}
                  <MenuListTop {...props} />
                </div>
                <div
                  onClick={toggleMenuOpen}
                  className='w-8 justify-center items-center h-8 cursor-pointer flex lg:hidden'>
                  {isOpen ? (
                    <i className='fas fa-times' />
                  ) : (
                    <i className='fas fa-bars' />
                  )}
                </div>
                {showSearchButton && <SearchButton />}
                {showRandomButton && <ButtonRandomPost {...props} />}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* 折叠侧边栏 */}
      <SideBarDrawer isOpen={isOpen} onClose={toggleSideBarClose}>
        <SideBar {...props} />
      </SideBarDrawer>
    </div>
  )
}

export default Header
