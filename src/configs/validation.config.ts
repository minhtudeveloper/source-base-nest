import {
  BadRequestException,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';

interface ValidationErrorReq {
  property: string;
  codes?: { [type: string]: string };
}

const getChildren = (
  item: ValidationError,
  parentPropertyName: string,
): ValidationErrorReq[] => {
  if (item.children && item.children.length > 0)
    return item.children.reduce<ValidationErrorReq[]>(
      (result, child) => [
        ...result,
        ...getChildren(child, `${parentPropertyName}.${item.property}`),
      ],
      [],
    );

  return [
    {
      property: `${parentPropertyName}.${item.property}`,
      codes: item.constraints,
    },
  ];
};

export default {
  transform: true,
  validationError: { target: false },
  exceptionFactory(errors) {
    const errs = errors.reduce(
      (result, err) => [
        ...result,
        ...(err.constraints
          ? [
            {
              property: err.property,
              codes: err.constraints,
            },
          ]
          : []),
        ...(err.children ?? [])
          ?.map((child) => getChildren(child, err.property))
          ?.flat(),
      ],
      [] as ValidationErrorReq[],
    );

    throw new BadRequestException(errs?.flat(), 'FORM_VALIDATION');
  },
} as ValidationPipeOptions;
