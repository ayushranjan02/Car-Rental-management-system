using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarRentalManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class final : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentCars_Cars_CarId",
                table: "RentCars");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Admins",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: ""
                );

            migrationBuilder.AddForeignKey(
                name: "FK_RentCars_Cars_CarId",
                table: "RentCars",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "CarId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentCars_Cars_CarId",
                table: "RentCars");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Admins");

            migrationBuilder.AddForeignKey(
                name: "FK_RentCars_Cars_CarId",
                table: "RentCars",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "CarId");
        }
    }
}
