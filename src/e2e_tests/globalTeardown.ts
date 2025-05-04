export default async function teardown() {
    const { server } = await import('../mocks/server')
    console.log('msw server close')
    server.close() // 테스트 종료 후 서버 종료
}
