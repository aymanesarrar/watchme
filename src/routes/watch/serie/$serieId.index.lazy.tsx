import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/watch/serie/$serieId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { serieId } = Route.useParams()
  return <div>Hello {serieId}</div>
}
