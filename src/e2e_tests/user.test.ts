import { test, expect } from '@playwright/test'

test('API mock test', async ({ page }) => {
    // 페이지 로드
    await page.goto('/')
    //click 버튼 클릭
    await page.locator('button', { hasText: 'click' }).click()
    // API 응답을 UI에서 확인 (예: 사용자 이름 확인)
    const userName = await page.locator('.user-name').textContent()

    // mock된 값 '홍길동'이 화면에 보여지는지 확인
    expect(userName).toBe('이름: 홍길동')
})
