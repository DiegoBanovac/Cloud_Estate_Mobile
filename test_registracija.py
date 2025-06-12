import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import TimeoutException, NoSuchElementException

def test_user_registration():
    driver = None
    try:
        # Setup ChromeDriver with more options
        options = webdriver.ChromeOptions()
        options.add_argument('--disable-gpu')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--start-maximized')
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        
        driver = webdriver.Chrome(
            service=webdriver.ChromeService(ChromeDriverManager().install()),
            options=options
        )

        app_url = 'http://localhost:9000/#/registracija'
        print(f"Navigating to {app_url}...")
        driver.get(app_url)

        # Wait for page to load completely
        print('Waiting for page to load...')
        WebDriverWait(driver, 30).until(
            lambda d: d.execute_script('return document.readyState') == 'complete'
        )
        
        # Alternative wait for Vue.js app to be ready
        time.sleep(2)  # Small delay for Vue to mount components

        # More robust way to find form elements in Quasar framework
        def find_quasar_input(label_text):
            # Try multiple strategies to find Quasar input fields
            attempts = [
                (By.XPATH, f"//label[contains(text(), '{label_text}')]/following::input[1]"),
                (By.XPATH, f"//div[contains(@class, 'q-field') and .//label[contains(text(), '{label_text}')]]//input"),
                (By.XPATH, f"//input[@aria-label='{label_text}']"),
                (By.XPATH, f"//input[contains(@placeholder, '{label_text}')]")
            ]
            
            for by, locator in attempts:
                try:
                    element = WebDriverWait(driver, 10).until(
                        EC.visibility_of_element_located((by, locator)))
                    # Scroll into view
                    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
                    return element
                except:
                    continue
            raise NoSuchElementException(f"Could not find input for {label_text}")

        print('Finding form elements...')
        name_input = find_quasar_input("Ime")
        surname_input = find_quasar_input("Prezime")
        email_input = find_quasar_input("E-mail")
        phone_input = find_quasar_input("Telefon")
        password_input = find_quasar_input("Lozinka")

        print('Form elements found. Filling out the form...')
        
        # Generate unique test data
        timestamp = int(time.time())
        test_email = f"testuser1@example.com"
        test_phone = f"123{timestamp % 1000000:06d}"[:9]  # 9 digit phone number

        def safe_send_keys(element, text):
            element.clear()
            time.sleep(0.3)
            element.send_keys(text)
            # Trigger Vue.js reactivity
            driver.execute_script("""
                var event = new Event('input', { bubbles: true });
                arguments[0].dispatchEvent(event);
            """, element)
            time.sleep(0.3)
            # Verify value was set
            assert element.get_attribute('value') == text, f"Value not set correctly for {element}"

        safe_send_keys(name_input, "Test")
        safe_send_keys(surname_input, "User")
        safe_send_keys(email_input, test_email)
        safe_send_keys(phone_input, test_phone)
        safe_send_keys(password_input, "Test123!")

        print('Form fields filled successfully.')

        # Find submit button (Quasar specific)
        submit_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Registriraj se') or contains(., 'Submit')]"))
        )
        
        print("Clicking submit button...")
        submit_button.click()

        # Verify successful registration
        print('Waiting for registration success...')
        try:
            WebDriverWait(driver, 30).until(
                lambda d: '/login' in d.current_url.lower() or 
                d.find_elements(By.XPATH, "//*[contains(text(), 'Registration successful')]")
            )
            print('User registration successful!')
        except TimeoutException:
            # Check for error messages
            error_messages = driver.find_elements(By.CSS_SELECTOR, '.q-notification, .error-message, .text-negative')
            if error_messages:
                print(f"Registration failed with errors: {[msg.text for msg in error_messages]}")
            else:
                print("Registration failed but no error messages found")
            raise

    except Exception as e:
        print(f"Test failed: {str(e)}")
        if driver:
            # Take screenshot
            screenshot_path = f'registration_error_{int(time.time())}.png'
            driver.save_screenshot(screenshot_path)
            print(f"Screenshot saved as {screenshot_path}")
            
            # Print page source for debugging
            with open('page_source.html', 'w', encoding='utf-8') as f:
                f.write(driver.page_source)
            print("Page source saved as page_source.html")
            
    finally:
        if driver:
            driver.quit()
            print('Browser closed.')

if __name__ == "__main__":
    test_user_registration()