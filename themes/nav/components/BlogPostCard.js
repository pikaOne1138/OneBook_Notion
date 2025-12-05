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
const BlogPostCard = ({ post, className, tagOptions }) => {
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
        className={`${className} h-full rounded-2xl p-4 dark:bg-neutral-800 cursor-pointer bg-white hover:bg-white dark:hover:bg-gray-800 ${currentSelected ? 'bg-green-50 text-green-500' : ''}`}>
        
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
                  const color = tagOptions?.find(t => t.value === tagName)?.color || 'gray'
                  return (
                    <TagItemMini key={tagName} tag={{ name: tagName, color: color }} />
                  )
                ))}
              </div>
            )}
              
          </div>
        </div>
      </div>
    </SmartLink>
  )
}

export default BlogPostCard
