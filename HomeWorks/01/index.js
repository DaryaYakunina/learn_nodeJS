import {stdin, stdout, stderr, argv} from "node:process";

let a = null;
let b = null;
let c = null;

for (const param of argv)
{
    if (param.startsWith("a="))
    {
        const splittedA = param.split("=");
        a = +splittedA[1];
        if (a&&b&&c)
        {
            break;
        }
    }

    if (param.startsWith("b="))
    {
        const splittedB = param.split("=");
        b = +splittedB[1];
        if (a&&b&&c)
        {
            break;
        }
    }

    if (param.startsWith("c="))
    {
        const splittedC = param.split("=");
        c = +splittedC[1];
        if (a&&b&&c)
        {
            break;
        }
    }
}

stdout.write(`Вы ввели: a=${a}, b=${b}, c=${c}.\n`);

let x1 = null;
let x2 = null;

x1 = (-b + Math.sqrt(b*b-4*a*c))/(2*a);
x2 = (-b - Math.sqrt(b*b-4*a*c))/(2*a);

if ((x1>=0)&&(x2>=0)&&(x1===x2))
{
    stdout.write(`Корень уравнения: x=${x1}.\n`);
    exit(0);
}
else if ((x1>=0)&&(x2>=0))
{
    stdout.write(`Корни уравнения: x1=${x1}, x2=${x2}.\n`);
    exit(0);
}
else
{
    stdout.write(`Корни уравнения не найдены.\n`);
    exit(-1);
}

