declare var process: Process;

interface Process {
  env: Env
}

interface Env {
  STOCK_INTERVAL: string,
  STOCK_DATABASE: string
}

interface GlobalEnvironment {
  process: Process
}
