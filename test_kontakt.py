import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import TimeoutException

def test_contact_agency():
    driver = None
    try:
        # Setup ChromeDriver
        options = webdriver.ChromeOptions()
        options.add_argument('--disable-gpu')
        options.add_argument('--no-sandbox')
        driver = webdriver.Chrome(
            service=webdriver.ChromeService(ChromeDriverManager().install()),
            options=options
        )
        driver.maximize_window()

        app_url = 'http://localhost:9000/#/kupnja_nekretnina'
        print(f"Navigating to {app_url}...")
        driver.get(app_url)

        # Wait for property cards to load
        print('Waiting for property cards...')
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'my-card'))
        )
        print('Property cards loaded.')

        # Find and click the contact button
        contact_button_xpath = "//button[contains(., 'Kontaktiraj') and contains(@class, 'q-btn')]"
        print("Waiting for contact button...")
        contact_button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.XPATH, contact_button_xpath))
        )
        print("Clicking contact button...")
        contact_button.click()

        # Wait for dialog to appear using multiple strategies
        print('Waiting for dialog to appear...')
        dialog_selector = "div.q-dialog:not([style*='none']) div.q-card"
        WebDriverWait(driver, 20).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, dialog_selector))
        )
        print('Dialog is visible.')

        # Alternative approach to find form elements
        print('Finding form elements...')
        
        # Switch to active element (might be the dialog)
        driver.switch_to.active_element
        
        # Find form elements using different strategies
        def find_with_retry(locator, by=By.XPATH, attempts=3):
            for i in range(attempts):
                try:
                    return WebDriverWait(driver, 10).until(
                        EC.visibility_of_element_located((by, locator))
                    )
                except:
                    if i == attempts - 1:
                        raise
                    time.sleep(1)

        # Try different locator strategies
        try:
            # Strategy 1: Find by placeholder or label
            name_input = find_with_retry("//input[contains(@aria-label, 'Ime') or contains(@placeholder, 'Ime')]")
            email_input = find_with_retry("//input[contains(@aria-label, 'E-mail') or contains(@placeholder, 'E-mail')]")
            phone_input = find_with_retry("//input[contains(@aria-label, 'Telefon') or contains(@placeholder, 'Telefon')]")
            message_input = find_with_retry("//textarea[contains(@aria-label, 'Poruka') or contains(@placeholder, 'Poruka')]")
        except:
            # Strategy 2: Find by following sibling div (original approach)
            name_input = find_with_retry("//label[contains(., 'Ime')]/following-sibling::div//input")
            email_input = find_with_retry("//label[contains(., 'E-mail')]/following-sibling::div//input")
            phone_input = find_with_retry("//label[contains(., 'Telefon')]/following-sibling::div//input")
            message_input = find_with_retry("//label[contains(., 'Poruka')]/following-sibling::div//textarea")

        print('Form elements found. Filling out the form...')
        
        # Clear and fill fields with small delays
        def safe_send_keys(element, text):
            element.clear()
            time.sleep(0.2)
            element.send_keys(text)

        safe_send_keys(name_input, "Test")
        safe_send_keys(email_input, "test_python@example.com")
        safe_send_keys(phone_input, "0987654321")
        safe_send_keys(message_input, "Ovo je testna poruka poslana putem Seleniuma s Pythonom.")

        print('Form fields filled successfully.')

        # Click send button
        send_button_xpath = "//button[contains(., 'Pošalji') and contains(@class, 'q-btn')]"
        print("Waiting for send button...")
        send_button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.XPATH, send_button_xpath))
        )
        print("Clicking send button...")
        send_button.click()

        # Verify submission
        print('Waiting for dialog to close...')
        WebDriverWait(driver, 20).until(
            EC.invisibility_of_element_located((By.CSS_SELECTOR, dialog_selector))
        )
        print('Form submitted successfully.')

        print('Test completed successfully!')

    except Exception as e:
        print(f"Test failed: {str(e)}")
        if driver:
            # Take screenshot
            screenshot_path = 'error_screenshot_python.png'
            driver.save_screenshot(screenshot_path)
            print(f"Screenshot saved as {screenshot_path}")
            
            # Print debugging information
            print(f"Current URL: {driver.current_url}")
            print(f"Page title: {driver.title}")
            
            try:
                print("Dialog HTML:")
                dialog = driver.find_element(By.CSS_SELECTOR, dialog_selector)
                print(dialog.get_attribute('outerHTML')[:1000])  # First 1000 chars
            except:
                print("Couldn't get dialog HTML")
    finally:
        if driver:
            driver.quit()
            print('Browser closed.')

if __name__ == "__main__":
    test_contact_agency()