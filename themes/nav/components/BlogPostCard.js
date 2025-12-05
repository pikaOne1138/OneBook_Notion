import { siteConfig } from '@/lib/config'
import { isHttpLink } from '@/lib/utils'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import NotionIcon from './NotionIcon'
import LazyImage from '@/components/LazyImage'
import TagItemMini from './TagItemMini'

/**
 * 博客卡牌
 * @param {*} param0
 * @returns
 */
const BlogPostCard = (props) => {
  // Debug: 檢查完整 props 和解構
  console.log('[BlogPostCard] ALL props keys:', Object.keys(props))
  console.log('[BlogPostCard] props.tagOptions:', props.tagOptions)

  const { post, className, tagOptions } = props
  console.log('[BlogPostCard] tagOptions after destructure:', tagOptions)

  // Debug: 提早檢查 post 的 link 欄位
  console.log('[BlogPostCard] ========== POST DEBUG ==========')
  console.log('[BlogPostCard] Post title:', post.title)
  console.log('[BlogPostCard] Post link value:', post.link)
  console.log('[BlogPostCard] Post link type:', typeof post.link)
  console.log('[BlogPostCard] Has link (!!post.link)?:', !!post.link)
  console.log('[BlogPostCard] All post keys:', Object.keys(post))
  console.log('[BlogPostCard] ================================')


  const router = useRouter()
  const currentSelected = router.asPath.split('?')[0] === '/' + post.slug

  let pageIcon =
    post.pageIcon !== ''
      ? post.pageIcon
      : siteConfig('IMG_LAZY_LOAD_PLACEHOLDER')
  pageIcon =
    post.pageIcon.indexOf('amazonaws.com') !== -1
      ? post.pageIcon + '&width=88'
      : post.pageIcon

  return (
    <SmartLink
      href={post?.href}
      target={isHttpLink(post.slug) ? '_blank' : '_self'}
      passHref>
      <div
        key={post.id}
        className={`${className} h-full rounded-2xl p-4 dark:bg-neutral-800 cursor-pointer bg-white hover:bg-white dark:hover:bg-gray-800 ${currentSelected ? 'bg-green-50 text-green-500' : ''} relative`}>

        {/* 外部連結圖示 */}
        {post?.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              console.log('[External Link] Clicked! URL:', post.link)
              e.preventDefault()
              e.stopPropagation()
              window.open(post.link, '_blank', 'noopener,noreferrer')
            }}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200 z-10 group"
            title="開啟外部連結">
            <svg
              className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}

        {/* 多列布局（lg以上，3列+）：封封面圖在頂部 */}
        {post?.pageCoverThumbnail && (
          <div className="hidden lg:block w-full h-32 mb-3 relative overflow-hidden rounded-lg group">
            <LazyImage
              src={post.pageCoverThumbnail}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
              alt={post.title}
            />
          </div>
        )}

        <div className='stack-entry w-full flex space-x-3 select-none dark:text-neutral-200'>
          {/* 少列布局（lg以下，1-2列）：封面圖在左側 */}
          {post?.pageCoverThumbnail && (
            <div className="lg:hidden w-20 h-20 relative flex-none overflow-hidden rounded-lg group">
              <LazyImage
                src={post.pageCoverThumbnail}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                alt={post.title}
              />
            </div>
          )}
          {siteConfig('POST_TITLE_ICON') && (
            <NotionIcon
              icon={pageIcon}
              size='10'
              className='text-6xl w-11 h-11 mx-1 my-0 flex-none'
            />
          )}
          <div className='stack-comment flex-auto'>
            <p className='title font-bold'>{post.title}</p>
            <p className='description font-normal line-clamp-2'>
              {post.summary ? post.summary : '暫無簡介'}
            </p>

            {/* 標籤 */}
            {post?.tags && post.tags.length > 0 && (
              <div className='flex flex-wrap gap-1 mt-2'>
                {post.tags.map(tagName => {
                  // 詳細 debug
                  console.log(`[Debug] tagName: "${tagName}", type: ${typeof tagName}`)
                  console.log(`[Debug] tagOptions:`, tagOptions)
                  const found = tagOptions?.find(t => t.name === tagName)
                  console.log(`[Debug] found:`, found)
                  const color = found?.color || 'gray'
                  console.log(`[Tag] ${tagName} -> color: ${color}, className: notion-${color}_background`)
                  return (
                    <TagItemMini key={tagName} tag={{ name: tagName, color: color }} />
                  )
                })}
              </div>
            )}

          </div>
        </div>
      </div>
    </SmartLink>
  )
}

export default BlogPostCard
