import { Button, type ButtonProps } from './ui/button'
import { Icons } from './icons'

type LoadingButtonProps = ButtonProps & {
  isLoading: boolean
  loadingText?: string
}

const LoadingButton = ({
  isLoading,
  loadingText,
  disabled,
  children,
  ...rest
}: LoadingButtonProps) => {
  return (
    <Button disabled={isLoading || disabled} {...rest}>
      {isLoading ? (
        <span className="flex items-center">
          <Icons.spinner className="me-2 h-4 w-4 animate-spin" />
          {loadingText ?? 'Loading...'}
        </span>
      ) : (
        children
      )}
    </Button>
  )
}

export default LoadingButton
