#include <cctype>
#include <iostream>
#include <sstream>
#include <stack>

using namespace std;

// 혹시나 모를 초기화 함수
void to_zero(stack<int> numbers) {
    while (!numbers.empty()) {
        numbers.pop();
    }
}




int Calc(string &postfix) {

    stack<int> numbers;
    stringstream convert(postfix);
    string partition;
    int result = 0;
    int number;

    int operand1, operand2;
    int operand3 = 1; // 제곱용도

    while (convert >> partition) {
        char c = partition[0];
        if (isdigit(c)) {
            stringstream(partition) >> number;
            numbers.push(number);
        } else if (c == '^' || c == '*' || c == '/' || c == '%' || c == '+' ||
                   c == '-') {
            operand2 = numbers.top();
            numbers.pop();
            operand1 = numbers.top();
            numbers.pop();
            switch (c) {
            case '+':
                numbers.push(operand1 + operand2);
                break;
            case '-':
                numbers.push(operand1 - operand2);
                break;
            case '*':
                numbers.push(operand1 * operand2);
                break;
            case '/':
                if (operand2 == 0) {
                    cout << "Error!" << endl;
                    to_zero(numbers);
                    return 0;
                } else {
                    numbers.push(operand1 / operand2);
                }
                break;
            case '%':
                if (operand2 == 0) {
                    cout << "Error!" << endl;
                    to_zero(numbers);
                    return 0;
                } else {
                    numbers.push(operand1 % operand2);
                }
                break;
            case '^':
                for (int i = 0; i < operand2; i++) {
                    operand3 *= operand1;
                }
                numbers.push(operand3);
                break;
            }
        }
    }
    cout << numbers.top() << endl;
    to_zero(numbers);
}

int main() {
    string infix = "";
    string postfix = "";
    stack<char> Operations;
    while (true) {
        cin >> infix;

        if (infix == "EOI") {
            break;
        }
        for (int i = 0; i < infix.length(); i++) {
            char c = infix.at(i);
            if (isdigit(c)) {
                int check = i;
                while (true) {
                    if (isdigit(c)) {
                        postfix += c;
                        check = i;
                        i++;
                        if (i == infix.length()) {
                            break;
                        } else {
                            c = infix.at(i);
                        }
                    } else if (!isdigit(c)) {
                        break;
                    }
                }
                postfix += " ";
                i = check;
            } else if (c == '(') {
                Operations.push(c);
            } else if (c == '+' || c == '-') {
                if (!Operations.empty()) {
                    if (Operations.top() == '^' || Operations.top() == '*' ||
                        Operations.top() == '/' || Operations.top() == '%') {
                        postfix += Operations.top();
                        postfix += " ";
                        Operations.pop();
                        Operations.push(c);
                    } else {
                        Operations.push(c);
                    }
                } else if (Operations.empty()) {
                    Operations.push(c);
                }
            } else if (c == '*' || c == '/' || c == '%') {
                if (!Operations.empty()) {
                    if (Operations.top() == '^') {
                        postfix += Operations.top();
                        postfix += " ";
                        Operations.pop();
                        Operations.push(c);
                    } else {
                        Operations.push(c);
                    }
                } else {
                    Operations.push(c);
                }
            } else if (c == '^') {
                Operations.push(c);
            } else if (c == ')') {
                while (true) {
                    if (Operations.top() == '(') {
                        Operations.pop();
                        break;
                    } else {
                        postfix += Operations.top();
                        postfix += " ";
                        Operations.pop();
                    }
                }
            }
        }
        while (true) {
            if (!Operations.empty()) {
                postfix += Operations.top();
                postfix += " ";
                Operations.pop();
            } else if (Operations.empty()) {
                break;
            }
        }
        while (true) {
            if (!Operations.empty()) {
            } else if (Operations.empty()) {
                break;
            }
        }
        // postfix를 계산해서 vector<int>result에 저장하는 함수 구현
        Calc(postfix);
        cout << endl;
        postfix.clear();
    } // 첫번째 while문
}
