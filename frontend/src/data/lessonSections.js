export const sections = [
	{
		id: '0',
		title: "Overview",
		lessons: [
			{
				id: "0.0",
				title: "Introduction",
				python: {
					content: "\
# Welcome to Code Racer!\n\n\
# The place to learn to code while improving your typing literacy!\n\n\
# In this section, we will go over how to use Code Racer!\n\
# You may have noticed that this oddly looks like a text box... That's because it is!\n\n\
# In order to get started, type in what you see, starting at #!\n\
# You should notice in the top-right corner, your stats are being tracked.\n\
# Once you finish, the timer will stop and that will be your final score!\n\
# Change your difficulty at the bottom portion of the screen to test your memory skills!\
					"
				},
				java: {
					content: "\
// Welcome to Code Racer!\n\n\
// The place to learn to code while improving your typing literacy!\n\n\
// In this section, we will go over how to use Code Racer!\n\
// You may have noticed that this oddly looks like a text box... That's because it is!\n\n\
// In order to get started, type in what you see, starting at //!\n\
// You should notice in the top-right corner, your stats are being tracked.\n\
// Once you finish, the timer will stop and that will be your final score!\n\
// Change your difficulty at the bottom portion of the screen to test your memory skills!\
					"
				},
				javascript: {
					content: "\
// Welcome to Code Racer!\n\n\
// The place to learn to code while improving your typing literacy!\n\n\
// In this section, we will go over how to use Code Racer!\n\
// You may have noticed that this oddly looks like a text box... That's because it is!\n\n\
// In order to get started, type in what you see, starting at //!\n\
// You should notice in the top-right corner, your stats are being tracked.\n\
// Once you finish, the timer will stop and that will be your final score!\n\
// Change your difficulty at the bottom portion of the screen to test your memory skills!\
"
				}
			},
			{
				id: "0.1",
				title: "Racing",
				python: {
					content: "\
# Once you feel ready to compete against other players, checkout the racing tab!\
					"
				},
				java: {
					content: "\
// Once you feel ready to compete against other players, checkout the racing tab!\
					"
				},
				javascript: {
					content: "\
// Once you feel ready to compete against other players, checkout the racing tab!\
"
				}
			}
		]
	},
	{
		id: '1',
		title: "Basics",
		lessons: [
			{
				id: "1.0",
				title: "Syntax",
				python: {
					content: "\
# Python Syntax Basics\n\
# Python uses indentation to define blocks of code\n\
if True:\n\
  print('This is a block')\n\n\
# Variables are assigned without keywords\n\
x = 5\n\
print(x)\n\n\
# Functions are defined with 'def'\n\
def greet(name):\n\
  return 'Hello ' + name\n\
print(greet('World'))\
	"
				},
				java: {
					content: "\
// Java Syntax Basics\n\
// Java uses curly braces to define code blocks\n\
public class Main {\n\
  public static void main(String[] args) {\n\
    System.out.println(\"This is a block\");\n\
  }\n\
}\n\n\
// Variables are declared with types\n\
int x = 5;\n\
System.out.println(x);\n\n\
// Functions are defined with 'return type' and 'method name'\n\
public static String greet(String name) {\n\
  return \"Hello \" + name;\n\
}\n\
System.out.println(greet(\"World\"));\
	"
				},
				javascript: {
					content: "\
// JavaScript Syntax Basics\n\
// JavaScript uses curly braces for blocks\n\
if (true) {\n\
  console.log('This is a block');\n\
}\n\n\
// Variables can be declared with let, const, or var\n\
let x = 5;\n\
console.log(x);\n\n\
// Functions are defined with 'function' keyword\n\
function greet(name) {\n\
  return 'Hello ' + name;\n\
}\n\
console.log(greet('World'));\
"
				}
			},
			{
				id: "1.1",
				title: "Math Operations",
				python: {
					content: "\
# Math Operations in Python\n\
# Addition\n\
x = 5 + 3\n\
print(x)  # Output: 8\n\n\
# Subtraction\n\
x = 10 - 4\n\
print(x)  # Output: 6\n\n\
# Multiplication\n\
x = 7 * 6\n\
print(x)  # Output: 42\n\n\
# Division\n\
x = 8 / 2\n\
print(x)  # Output: 4.0\
	"
				},
				java: {
					content: "\
// Math Operations in Java\n\
// Addition\n\
int x = 5 + 3;\n\
System.out.println(x);  // Output: 8\n\n\
// Subtraction\n\
x = 10 - 4;\n\
System.out.println(x);  // Output: 6\n\n\
// Multiplication\n\
x = 7 * 6;\n\
System.out.println(x);  // Output: 42\n\n\
// Division\n\
x = 8 / 2;\n\
System.out.println(x);  // Output: 4\
"
				},
				javascript: {
					content: "\
// Math Operations in JavaScript\n\
// Addition\n\
let x = 5 + 3;\n\
console.log(x);  // Output: 8\n\n\
// Subtraction\n\
x = 10 - 4;\n\
console.log(x);  // Output: 6\n\n\
// Multiplication\n\
x = 7 * 6;\n\
console.log(x);  // Output: 42\n\n\
// Division\n\
x = 8 / 2;\n\
console.log(x);  // Output: 4\
"
				}
			}
		]
	}
]
