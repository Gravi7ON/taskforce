import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user access token',
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2I3MGUzZjU2ZTcxYjQ1ZDNkNzMwNDkiLCJlbWFpbCI6ImVydHlAZ21haWwuY29tIiwicm9sZSI6ItCX0LDQutCw0LfRh9C40LoiLCJuYW1lIjoiQ2hpcCBIYXdrIiwiaWF0IjoxNjczODY3MjUwLCJleHAiOjE2NzM5MjcyNTB9.SgkcNjw5dW9WbB0bgpu5tZANqaBjlFIuVSlCPFVd3Mk"
  })
  @Expose()
  public access_token: string;
}
