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
  const { post, className, tagOptions } = props
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

  // 檢查內容是否為空（只看 summary）
  const isEmpty = !post.summary || post.summary === '內容撰寫中…'
  // 處理空內容點擊
  const handleEmptyClick = () => {
    alert('📝 內容撰寫中...\n\n此文章尚未完成，敬請期待！')
  }

  // 卡片內容
  const cardContent = (
    <div
      key={post.id}
      className={`${className} h-full rounded-2xl p-4 dark:bg-neutral-800 cursor-pointer bg-white hover:bg-white dark:hover:bg-gray-800 ${currentSelected ? 'bg-green-50 text-green-500' : ''} relative`}>

      {/* 外部連結圖示 */}

      {post?.ext_link && (
        <a
          href={post.ext_link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            console.log('[External Link] Clicked! URL:', post.ext_link)
            e.preventDefault()
            e.stopPropagation()
            window.open(post.ext_link, '_blank', 'noopener,noreferrer')
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
            {post.summary ? post.summary : '內容撰寫中…'}
          </p>

          {/* 標籤 */}
          {post?.tags && post.tags.length > 0 && (
            <div className='flex flex-wrap gap-1 mt-2'>
              {post.tags.map(tagName => {
                const found = tagOptions?.find(t => t.name === tagName)
                const color = found?.color || 'gray'
                return (
                  <TagItemMini key={tagName} tag={{ name: tagName, color: color }} />
                )
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  )

  // 如果內容為空，不使用 SmartLink
  if (isEmpty) {
    return <div onClick={handleEmptyClick}>{cardContent}</div>
  }

  // 有內容才使用 SmartLink
  return (
    <SmartLink
      href={post?.href}
      target={isHttpLink(post.slug) ? '_blank' : '_self'}
      passHref>
      {cardContent}
    </SmartLink>
  )
}

export default BlogPostCard
