// MSW 서버 시작 및 종료 설정
export default async function setup() {
    // const { worker } = await import('../mocks/browser')
    // await worker.start() // 테스트 중 mock 응답 활성화
    const { server } = await import('../mocks/server')
    console.log('msw server start')
    server.listen() // 테스트 중 mock 응답 활성화
}
