import { getAppRoutes } from "v2/routes"
import { compact, uniq } from "lodash"
import { RouteConfig } from "found"

export function getRouteConfig(): {
  routes: RouteConfig[]
  routePaths: string[]
} {
  const routes = getAppRoutes()

  const getRoutes = (acc, route: RouteConfig, basePath = "") => {
    const path = compact([basePath, route.path]).join("/")

    const INVALID_PATHS = ["/", "*"]

    const isInvalid = INVALID_PATHS.some(
      invalidPath => route.path === invalidPath
    )

    if (!isInvalid) {
      acc.push(path)
    }

    if (route.children) {
      return route.children.map(childRoute => getRoutes(acc, childRoute, path))
    }
  }

  const routePaths = routes.reduce((acc, route) => {
    getRoutes(acc, route)
    return uniq(acc)
  }, [])

  return {
    routes,
    routePaths,
  }
}