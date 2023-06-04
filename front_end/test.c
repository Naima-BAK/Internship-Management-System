#include "header.h"

/**
 * main - main funcion.
 *
 * @argc: The counter argument.
 * @argv: An array of strings.
 *
 * Return: always 0.
 */

int main(int argc, char **argv)
{
int path_status, status, num, index, success, errors;
char *path_ptr, **arguments, *pointer, *token_, **environment;
pid_t pid;
char *cmd_line = NULL;
size_t size = 0;
ssize_t uns, uns2 = 0;
errors = 0;
success = 0;
pointer = "RANDOM";
(void) uns2;
(void) argc;
environment = environ;
index = isatty(STDIN_FILENO);
path_ptr = NULL;
num = 0;
while (1)
{
num++;
if (index)
uns2 = write(1, "#cisfun$ ", 9);
signal(SIGINT, signal_request);
uns = getline(&cmd_line, &size, stdin);
if (uns == -1 && index)
{
write(1, "\n", 1);
free(cmd_line);
exit(success);
}
if (uns == -1 && !index)
{
free(cmd_line);
exit(success);
}
if (f_strcmp(cmd_line, "\n") == 0 && index)
continue;
arguments = split_function(cmd_line);
if (!arguments)
continue;
if (f_strcmp(arguments[0], "exit") == 0)
{
exit_function(argv, arguments, cmd_line, num, &errors, &success);
continue;
}
if (f_strcmp(arguments[0], "env") == 0)
{
environment_arguments(arguments);
_free_function(arguments);
continue;
}
pid = fork();
if (pid == -1)
{
_free_function(arguments);
uns2 = write(STDERR_FILENO, "fork  failed\n", 12);
return (1);
}
else if (pid == 0)
{
path_status = find_path(arguments[0]);
if (path_status != 0)
{
pointer = getenv_function("PATH");
token_ = strtok(pointer, ":");
while (token_ != NULL)
{
path_ptr = f_strcat(token_, arguments[0]);

if (access(path_ptr, F_OK) != -1)
break;
token_ = strtok(NULL, ":");
if (token_ != NULL)
free(path_ptr);
}
if (path_ptr == NULL)
path_ptr = arguments[0];
}
else
path_ptr = arguments[0];
if (_strlen(pointer) != -1)
execve(path_ptr, arguments, environment);
error_function(argv[0], arguments[0], num, path_status, &success);
if (path_status != 0 && f_strlen(pointer) && f_strlen(pointer) != -1)
free(path_ptr);
_free_function(arguments);
free(cmd_line);
exit(success);
}
else
{
wait(&status);
_free_function(arguments);
success = WEXITSTATUS(status);
}
fflush(stdin);
}
free(cmd_line);
return (0);
}